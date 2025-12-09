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
    this.populateChart(chart, data);
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
    });
  }

  populateChart(chart: Chart, inputData: WeatherState[]) {
    const chartData: ChartDataset<'line'>[] = inputData.map((item) => ({
      label: item.city + ', ' + item.state,
      data: item.rolling12MonthTemps,
    }));
    const averageData: ChartDataset<'line'>[] = inputData.map((item) => ({
      label: item.city + ', ' + item.state + ' avg',
      data: [item.rolling12MonthAvg!],
      // backgroundColor: Colors.beforeLayout()
    }));

    chart.data.datasets = chartData;
    chart.resize();
    chart.update();
    console.log(chart);
  }
}
