import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.less'],
})
export class AccountInfoComponent implements OnInit {
  title: string = '广中路街道';
  desc: string = '生活垃圾分类全程监管平台';
  constructor() {}

  ngOnInit(): void {}
}
