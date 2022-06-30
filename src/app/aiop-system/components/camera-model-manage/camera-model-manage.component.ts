import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CameraAIModel } from 'src/app/network/model/camera-ai.model';
import { CameraModelManageBusiness } from './camera-model-manage.business';
import Conf from "src/assets/json/ai-icon.json"

@Component({
  selector: 'howell-camera-model-manage',
  templateUrl: './camera-model-manage.component.html',
  styleUrls: ['./camera-model-manage.component.less'],
  providers: [
    CameraModelManageBusiness
  ]
})
export class CameraModelManageComponent implements OnInit {

  AIModels: CameraAIModel[] = [];
  imgBase = 'assets/img/ai-model';
  icons: any = Conf;

  constructor(private _business: CameraModelManageBusiness, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this._init()
  }
  private async _init() {
    let AIModelsRes = await this._business.listAIModels();
    this.AIModels = AIModelsRes.Data
    let labels = await this._business.listLabels();
    console.log(labels)
    this._business.init();
  }

}
