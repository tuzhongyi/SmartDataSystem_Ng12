import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Config from 'src/assets/json/system-mode.json';

// console.log(systemModeConfig);
@Component({
  selector: 'app-system-mode',
  templateUrl: './system-mode.component.html',
  styleUrls: ['./system-mode.component.less'],
})
export class SystemModeComponent implements OnInit {
  config = Config.data;
  constructor(private _title: Title, private _router: Router) {
    this._title.setTitle('生活垃圾分类全程监管平台');
  }

  ngOnInit(): void {}

  navigate(path: string) {
    // console.log('path', path);
    this._router.navigateByUrl(path);
  }
}
