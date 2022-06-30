import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CameraModelManageBusiness } from './camera-model-manage.business';

@Component({
  selector: 'howell-camera-model-manage',
  templateUrl: './camera-model-manage.component.html',
  styleUrls: ['./camera-model-manage.component.less'],
  providers: [
    CameraModelManageBusiness
  ]
})
export class CameraModelManageComponent implements OnInit {

  constructor(private _business: CameraModelManageBusiness, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this._init()
  }
  private async _init() {
    let AIModels = await this._business.listAIModels();
    console.log(AIModels);

    let labels = await this._business.listLabels();
    console.log(labels)
    this._business.init();
  }

}
