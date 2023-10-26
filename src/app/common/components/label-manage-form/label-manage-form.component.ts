import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ResourceLabel } from 'src/app/network/model/garbage-station/resource-label.model';
import { LabelManageFormBusiness } from './label-manage-form.business';

@Component({
  selector: 'howell-label-manage-form',
  templateUrl: './label-manage-form.component.html',
  styleUrls: ['./label-manage-form.component.less'],
  providers: [LabelManageFormBusiness],
})
export class LabelManageFormComponent implements OnInit {
  resourceLabels: ResourceLabel[] = [];
  selectedLabels: ResourceLabel[] = [];

  @Input() resourceName = '';

  @Input()
  resourceId: string = '';

  @Output()
  closeEvent = new EventEmitter<boolean>();

  constructor(
    private _business: LabelManageFormBusiness,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.resourceId) {
      this._listResourceLabels();
    }
  }

  private async _listResourceLabels() {
    this.resourceLabels = await this._business.getResourceLabels(
      this.resourceId
    );
    // console.log('资源标签', this.resourceLabels)
  }

  selectLabelEvent(labels: ResourceLabel[]) {
    this.selectedLabels = labels;
  }
  async onSubmit() {
    // console.log(this.resourceLabels)
    // console.log(this.selectedLabels)

    let filtered = this.selectedLabels.filter((selected) => {
      return !this.resourceLabels.some(
        (resource) => resource.Id == selected.Id
      );
    });
    console.log(filtered);
    // 在提交前,先排除掉重复的标签,否则后台报错
    for (let i = 0; i < filtered.length; i++) {
      let id = filtered[i].Id;
      await this._business.addResourceLabel(this.resourceId, id);
    }

    this._toastrService.success('操作成功');
    this.closeEvent.emit(true);
  }
  onReset() {
    this.closeEvent.emit(false);
  }
}
