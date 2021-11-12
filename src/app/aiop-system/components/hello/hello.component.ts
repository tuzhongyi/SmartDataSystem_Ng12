import { Component, OnInit } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { TreeSelectMode } from 'src/app/enum/tree-select-mode.enum';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { StationRequestService } from 'src/app/network/request/station/garbage-station-request.service';
import { FlatTreeNode } from 'src/app/view-model/flat-tree-node.model';
import { NestedTreeNode } from 'src/app/view-model/nested-tree-node.model';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css'],
})
export class HelloComponent implements OnInit {
  public data: NestedTreeNode[] = [
    {
      name: '黄浦区',
      children: [
        {
          name: '南京东路街道',
          children: [
            {
              name: '云南中路居委会',
            },
            {
              name: '新桥居委会',
            },
          ],
        },
        {
          name: '外滩街道',
          children: [
            {
              name: '汉口路居委会',
            },
            {
              name: '东风居委会',
            },
            {
              name: '宝兴居委会',
            },
          ],
        },
        {
          name: '豫园街道',
          children: [
            {
              name: '四新居委会',
            },
          ],
        },
      ],
    },
    {
      name: 'Fruit',
      children: [
        { name: 'Apple' },
        { name: 'Banana' },
        { name: 'Fruit loops' },
      ],
    },
    {
      name: 'Vegetables',
      children: [
        {
          name: 'Green',
          children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
        },
        {
          name: 'Orange',
          children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
        },
      ],
    },
  ];

  public selectMode: TreeSelectMode = TreeSelectMode.single;

  private currentNode: FlatTreeNode | null = null;

  constructor(
    private divisionService: DivisionRequestService,
    private stationService: StationRequestService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }
  async loadData() {
    let params = new GetDivisionsParams();
    params.PageSize = 99999;
    // params.DivisionType = DivisionType.County;
    // params.ParentId = '310101000000';
    let res = await this.divisionService.list(params);
    console.log(res);
  }
  selectEventHandler(nodes: any) {
    console.log('当前选中节点', nodes);
    let currentNode = nodes[0] || null;
    console.log(currentNode);
  }
  addHandler() {}
  deleteHandler() {}
  editHandler() {}
}
