import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TreeComponent } from 'src/app/common/components/tree/tree.component';
import { Deduplication } from 'src/app/global/tool/deduplication';

@Component({
  selector: 'howell-garbage-station-manage',
  templateUrl: './garbage-station-manage.component.html',
  styleUrls: ['./garbage-station-manage.component.less']
})
export class GarbageStationManageComponent implements OnInit {

  private _condition: string | Symbol = Symbol.for('DIVISION-TREE');

  // 要屏蔽的搜索字符串
  private _searchGuards: string[] = ['街道', '路居委会'];

  /**
   *  屏蔽: 街,街道,道,居,居委,居委会,委,委会,会
   */
  private _excludeGuards: string[] = [];

  @ViewChild('tree') tree?: TreeComponent;


  constructor(private _toastrService: ToastrService,) {
    this._excludeGuards = Deduplication.generateExcludeArray(this._searchGuards)

  }

  ngOnInit(): void {
  }
  async searchTree(condition: string) {
    if (this._condition == condition && this._condition != '') {
      this._toastrService.warning('重复搜索相同字段');
      return;
    }
    if (this._excludeGuards.includes(condition)) {
      this._toastrService.warning('关键字不能是: ' + condition);
      return;
    }

    this._condition = condition;

    if (this.tree) {
      let res = await this.tree.searchNode(condition);
      if (res && res.length) {
        this._toastrService.success('操作成功');
      } else {
        this._toastrService.warning('无匹配结果');
      }
    }
  }
  async searchTable(condition: string) {

  }

}
