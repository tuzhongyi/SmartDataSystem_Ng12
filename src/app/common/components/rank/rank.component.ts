/*
 * @Author: pmx
 * @Date: 2021-10-13 15:02:38
 * @Last Modified by: pmx
 * @Last Modified time: 2021-10-14 17:19:21
 */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.less'],
})
export class RankComponent implements OnInit {
  @Input() title: string = '';

  constructor() {}
  ngOnInit(): void {
    // console.log(this.dropLists);
  }
}

export type DropListModel = {
  id: string;
  name: string;
};
