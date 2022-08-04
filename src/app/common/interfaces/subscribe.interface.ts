import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalStoreService } from 'src/app/common/service/global-store.service';

export interface ISubscription {
  subscription?: Subscription;
  subscribe(fn: () => void): void;
  destroy(): void;
}

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService implements ISubscription {
  constructor(private storeService: GlobalStoreService) { }
  subscription?: Subscription;

  subscribe(fn: () => void) {
    this.subscription = this.storeService.statusChange.subscribe(() => {
      fn();
    });
  }
  destroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }
}
