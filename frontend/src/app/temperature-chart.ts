import { computed, Directive, effect, ElementRef, inject, input, viewChild } from '@angular/core';
import {
  LineController,
  Chart,
  Legend,
  Colors,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  ChartDataset,
} from 'chart.js';

import { WeatherState } from './types';

Chart.register(
  Colors,
  CategoryScale,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement
);

export function getMonthLabels() {
  let months: string[] = [];
  let date = new Date();
  for (let i = 0; i < 12; i++) {
    date.setMonth(date.getMonth() - 1);
    months.unshift(date.toLocaleString('en', { month: 'short' }));
  }
  return months;
}

@Directive({
  selector: 'canvas[appTemperatureChartData]',
})
export class TemperatureChartDirective {
  canvasRef: ElementRef<HTMLCanvasElement> = inject(ElementRef);
  weatherData = input<WeatherState[]>([], { alias: 'appTemperatureChartData' });
  readonly monthLabels = getMonthLabels();

  chart = computed(() => {
    const canvas = this.canvasRef.nativeElement;
    return this.buildChart(canvas);
  });

  populated = effect(() => {
    let chart = this.chart();
    let data = this.weatherData();
    try {
      // Heisen Bug.  If not in try/catch, breaks rest of site when this breaks.
      // "Can't read [property] of undefined in Chartjs"
      this.populateChart(chart, data);
    } catch (err) {
      console.error(err);
    }
  });

  buildChart(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas has no context');
    }
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.monthLabels,
        datasets: [],
      },
      options: {
        plugins: {
          colors: {
            forceOverride: true,
          },
        },
      },
    });
  }

  populateChart(chart: Chart<'line'>, inputData: WeatherState[]) {
    const chartData: ChartDataset<'line'>[] = inputData.map((item, index) => {
      let label = item.city + ', ' + item.state;
      let newSet = chart.data.datasets.find((set) => set.label === label) ?? {
        label: item.city + ', ' + item.state,
        data: item.rolling12MonthTemps,
        hidden: item.status === 'error',
      };
      newSet.label = item.city + ', ' + item.state;
      newSet.data = item.rolling12MonthTemps;
      return newSet;
    });
    const averageData: ChartDataset<'line'>[] = inputData.map((item) => ({
      label: item.city + ', ' + item.state + ' avg',
      data: [item.rolling12MonthAvg!],
    }));

    console.log(chartData);

    chart.data.datasets = chartData;
    chart.resize();
    chart.update();

    inputData.forEach((item, index) => {
      if (item.status === 'error') {
        chart.hide(index);
      }
    });
    console.log(chart);
  }
}
