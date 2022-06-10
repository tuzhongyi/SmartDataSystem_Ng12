import { EventEmitter, Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { LocalStorageService } from 'src/app/global/service/local-storage.service';
import { User } from 'src/app/network/model/user.model';
import { MobileChangeStep } from '../../../mobile/mobile.model';

export class MobileWindowViewModel extends WindowViewModel {
  constructor(user: User) {
    super();
    this.user = user;
    this.step = this.user.MobileNo
      ? MobileChangeStep.Check
      : MobileChangeStep.Bind;
    console.log(this.show);
  }
  user: User;
  styles = {
    width: '576px',
    height: '300px',
    top: '50%',
    left: '50%',
    transform: 'translate(-288px, -150px)',
  };

  step: MobileChangeStep;

  bindedEvent = new EventEmitter();

  onBinded() {
    this.bindedEvent.emit();
    this.step = MobileChangeStep.Check;
    this.show = false;
  }
  onCancel() {
    this.show = false;
  }
}
