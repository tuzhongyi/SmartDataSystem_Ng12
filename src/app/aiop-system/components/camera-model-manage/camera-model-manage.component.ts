import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CameraAIModel } from 'src/app/network/model/camera-ai.model';
import { AICameraModelManageBusiness } from './camera-model-manage.business';
import Conf from "src/assets/json/ai-icon.json"
import { Page } from 'src/app/network/model/page_list.model';
import { BehaviorSubject } from 'rxjs';
import { AICameraModelManageModel } from 'src/app/view-model/ai-camera-model-manage.model';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'howell-camera-model-manage',
  templateUrl: './camera-model-manage.component.html',
  styleUrls: ['./camera-model-manage.component.less'],
  providers: [
    AICameraModelManageBusiness
  ]
})
export class CameraModelManageComponent implements OnInit {

  private _pageSize = 3;
  private _condition = '';

  // 模型列表
  AIModels: CameraAIModel[] = [];
  imgBase = 'assets/img/ai-model';
  icons: any = Conf;

  // Table
  dataSubject = new BehaviorSubject<AICameraModelManageModel[]>([]);
  tableSelectStrategy = SelectStrategy.Multiple;
  selectedRows: AICameraModelManageModel[] = []; //table选中项
  // willBeDeleted: AIModelManageModel[] = [];


  // Paginator
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;


  constructor(private _business: AICameraModelManageBusiness, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this._init()
  }
  pageEvent(pageInfo: PageEvent) {
    if (this.pageIndex == pageInfo.pageIndex + 1) return;
    this.pageIndex = pageInfo.pageIndex + 1;
    this._init();
  }
  private async _init() {
    let AIModelsRes = await this._business.listAIModels();
    this.AIModels = AIModelsRes.Data;

    let res = await this._business.init(
      this._condition,
      this.pageIndex,
      this._pageSize
    );
    this.page = res.Page;
    this.dataSubject.next(res.Data);



    // let labels = await this._business.listLabels();
    // console.log(labels)
  }


}
