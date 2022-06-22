import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { Language } from 'src/app/common/tools/language';
import { WindowViewModel } from './window.model';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css'],
})
export class WindowComponent implements OnInit {
  Language = Language;
  @Input()
  Model: WindowViewModel = {
    show: false,
  };

  @Input()
  Background = true;

  @Input()
  CloseButton = true;

  private _style: any = {
    width: '80%',
    height: '80%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
  };
  public get style(): any {
    return this._style;
  }
  @Input()
  public set style(v: any) {
    this._style = Object.assign(this._style, v);
  }

  @Output()
  OnClosing: EventEmitter<boolean> = new EventEmitter();

  @Input()
  status?: OnlineStatus;

  @Input()
  manualClose = false;

  constructor() {}

  ngOnInit() {}

  closeButtonClick() {
    if (this.manualClose === false) {
      this.Model.show = false;
    }
    this.OnClosing.emit(true);
  }
}
