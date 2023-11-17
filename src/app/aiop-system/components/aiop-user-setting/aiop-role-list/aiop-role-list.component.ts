import { Component, OnInit } from '@angular/core';
import { CommonCheckboxListComponent } from 'src/app/common/components/common-checkbox-list/common-checkbox-list.component';
import { ICommonTree } from 'src/app/common/components/common-tree/common-tree.model';
import { Role } from 'src/app/network/model/garbage-station/role.model';
import { AIOPRoleListBusiness } from './aiop-role-list.business';

@Component({
  selector: 'aiop-role-list',
  templateUrl: './aiop-role-list.component.html',
  styleUrls: ['./aiop-role-list.component.less'],
  providers: [AIOPRoleListBusiness],
})
export class AIOPRoleListComponent
  extends CommonCheckboxListComponent<Role>
  implements OnInit, ICommonTree
{
  constructor(private business: AIOPRoleListBusiness) {
    super();
  }
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.business.load().then((x) => {
      this.datas = x;
    });
  }
}
