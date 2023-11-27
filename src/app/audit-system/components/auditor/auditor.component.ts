import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'auditor',
  templateUrl: './auditor.component.html',
  styleUrls: ['./auditor.component.less'],
})
export class AuditorComponent implements OnInit {
  regExp =
    /(?<=\/)(?<first>[\w-]*)(?:\/(?<second>[\w-]*)(?:\/(?<third>[\w-]*))?)?\/?$/;
  constructor(title: Title) {
    title.setTitle('系统运维');
  }

  ngOnInit(): void {}
}
