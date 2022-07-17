import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ResourceLabel } from 'src/app/network/model/resource-label.model';
import { LabelManageFormBusiness } from './label-manage-form.business';

@Component({
  selector: 'howell-label-manage-form',
  templateUrl: './label-manage-form.component.html',
  styleUrls: ['./label-manage-form.component.less'],
  providers: [
    LabelManageFormBusiness
  ]
})
export class LabelManageFormComponent implements OnInit {


  selectedLabels: ResourceLabel[] = []

  @Input()
  resourceId: string = '';


  @Output()
  closeEvent = new EventEmitter<boolean>();

  constructor(private _business: LabelManageFormBusiness, private _toastrService: ToastrService) { }

  ngOnInit(): void {
  }


  selectLabelEvent(labels: ResourceLabel[]) {
    this.selectedLabels = labels
  }
  async onSubmit() {
    for (let i = 0; i < this.selectedLabels.length; i++) {
      let id = this.selectedLabels[i].Id;
      await this._business.addResourceLabel(this.resourceId, id)
    }
    this._toastrService.success('操作成功')
    this.closeEvent.emit(true)
  }
  onReset() {
    this.closeEvent.emit(false)
  }
}
