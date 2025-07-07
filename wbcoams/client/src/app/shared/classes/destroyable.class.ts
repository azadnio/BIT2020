import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export abstract class Destroyable {
  protected destroyRef = inject(DestroyRef);

  constructor() {}

  public untilDestroyed<T>() {
    return takeUntilDestroyed<T>(this.destroyRef);
  }
}
