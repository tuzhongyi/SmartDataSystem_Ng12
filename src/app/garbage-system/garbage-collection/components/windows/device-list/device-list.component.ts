import { Component, Inject, OnInit } from '@angular/core';
import { ToastWindowService } from 'src/app/common/components/toast-window/toast-window.service';

@Component({
  selector: 'device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.less'],
})
export class DeviceListComponent implements OnInit {
  constructor(private _toastWindowService: ToastWindowService) {}

  ngOnInit(): void {}
}
