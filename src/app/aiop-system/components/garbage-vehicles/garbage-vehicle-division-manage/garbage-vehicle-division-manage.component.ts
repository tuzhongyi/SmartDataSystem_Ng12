import { Component, OnInit } from '@angular/core';
import { GarbageVehicleDivisionManageBusiness } from './garbage-vehicle-division-manage.business';
import { GarbageVehicleDivisionTreeBusiness } from '../trees/garbage-vehicle-division-tree/garbage-vehicle-division-tree.business';

@Component({
  templateUrl: './garbage-vehicle-division-manage.component.html',
  styleUrls: ['garbage-vehicle-division-manage.component.less'],
  providers: [
    GarbageVehicleDivisionManageBusiness,
    GarbageVehicleDivisionTreeBusiness,
  ],
})
export class GarbageVehicleDivisionManageComponent implements OnInit {
  constructor(
    public business: GarbageVehicleDivisionManageBusiness,
    public tree: GarbageVehicleDivisionTreeBusiness
  ) {}
  ngOnInit(): void {}
}
