/*
 * @Author: pmx
 * @Date: 2021-10-11 13:11:58
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-02 10:51:46
 */
import { Component, OnInit } from '@angular/core';
import { Division } from 'src/app/network/model/division.model';
import { CollectionDivisionListBusiness } from './collection-division-list.business';

@Component({
  selector: 'collection-division-list',
  templateUrl: './collection-division-list.component.html',
  styleUrls: ['./collection-division-list.component.less'],
  providers: [CollectionDivisionListBusiness],
})
export class GarbageCollectionDivisionListComponent implements OnInit {
  parentDivision: Division | null = null;

  constructor(public business: CollectionDivisionListBusiness) {}

  ngOnInit(): void {}
  itemClick(division: Division) {
    this.business.notifyMessage(division);
  }
}
