import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WindowViewModel } from '../window-control/window.model';

@Component({
  selector: 'confirm-window',
  templateUrl: './window-confirm.component.html',
  styleUrls: [
    '../../../../assets/less/confirm.less',
    './window-confirm.component.less',
  ],
})
export class WindowConfirmComponent implements OnInit {
  private _style: any = {
    width: '500px',
    height: 'auto',
  };
  public get style(): any {
    return this._style;
  }
  @Input()
  public set style(v: any) {
    this._style = Object.assign(this._style, v);
  }
  @Input()
  model: WindowViewModel = new WindowViewModel();
  @Input() title: string = '提示';
  @Input() content: string = '';

  @Output() ok: EventEmitter<void> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onok() {
    this.ok.emit();
  }
  oncancel() {
    this.cancel.emit();
  }
}
