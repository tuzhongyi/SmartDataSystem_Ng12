import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LocalStorageService } from 'src/app/global/service/local-storage.service';

@Component({
  selector: 'app-waste-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.less'],
})
export class MonitorComponent implements OnInit {
  constructor(private _titleService: Title) {
    this._titleService.setTitle('生活垃圾分类全程监管平台');
  }
  ngOnInit(): void {}
}
