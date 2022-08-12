import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/common/service/store.service';
import { CommitteesNavicationConverter } from '../navication/navication.component.converter';
import { ElectricBikeIndexBusiness } from './business/index.component.business';
import { ElectricBikeIndexNavicationBusiness } from './business/index.navication.business';
import { ElectricBikeIndexService } from './index.component.service';

@Component({
  selector: 'howell-electric-bike-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
  providers: [
    ElectricBikeIndexService,
    ElectricBikeIndexBusiness,
    ElectricBikeIndexNavicationBusiness,
  ],
})
export class ElectricBikeIndexComponent implements OnInit {
  constructor(
    public business: ElectricBikeIndexBusiness,
    public navication: ElectricBikeIndexNavicationBusiness,
    private service: ElectricBikeIndexService,
    private store: StoreService
  ) {}

  converter = {
    navication: new CommitteesNavicationConverter(),
  };

  ngOnInit(): void {
    this.initNavication();
  }
  async initNavication() {
    let root = await this.service.getDivision();
    this.navication.root = this.converter.navication.Convert(root);
    let children = await this.service.getChildren(root.Id);
    this.navication.children = children.map((x) => {
      return this.converter.navication.Convert(x);
    });
  }
}
