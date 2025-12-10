import { computed, Directive, effect, input } from '@angular/core';

@Directive({
  selector: '[appSkeletonLoader]',
  host: {
    '[class]': 'extraClasses()',
  },
})
export class SkeletonLoader {
  loading = input.required<boolean>();
  style = input<'line' | 'circle'>('line');

  extraClasses = computed(() => {
    if (this.loading()) {
      return 'animate-pulse rounded-full bg-gray-200 text-transparent';
    } else {
      return '';
    }
  });

  endEffect = effect(() => {
    console.log(this.extraClasses());
  });
}
