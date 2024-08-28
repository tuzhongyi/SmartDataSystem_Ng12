import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Language } from 'src/app/common/tools/language';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { AuditListStationGarbageManagerCommandNBBoxBusiness } from './audit-list-station-garbage-manager-command-nb-box.business';
import { AuditListStationGarbageManagerCommandNBBoxWindow } from './audit-list-station-garbage-manager-command-nb-box.window';

@Component({
  selector: 'audit-list-station-garbage-manager-command-nb-box',
  templateUrl:
    './audit-list-station-garbage-manager-command-nb-box.component.html',
  styleUrls: [
    '../../../../../assets/less/confirm.less',
    './ai-garbage-station-device-commands.less',
    './audit-list-station-garbage-manager-command-nb-box.component.less',
  ],
  providers: [AuditListStationGarbageManagerCommandNBBoxBusiness],
})
export class AuditListStationGarbageManagerCommandNBBoxComponent
  implements OnInit
{
  @Input() model?: GarbageStation;
  constructor(
    private business: AuditListStationGarbageManagerCommandNBBoxBusiness,
    private toastr: ToastrService
  ) {}

  window = new AuditListStationGarbageManagerCommandNBBoxWindow();
  Language = Language;

  ngOnInit(): void {}

  tocommand(type: number) {
    this.window.confirm.type = type;
    this.window.confirm.show = true;
  }
  oncommand() {
    if (this.model && this.window.confirm.type) {
      this.business
        .reboot(this.model.Id, this.window.confirm.type)
        .then((x) => {
          this.toastr.success('操作成功');
        })
        .catch((x) => {
          this.toastr.error('操作失败');
        })
        .finally(() => {
          this.window.close();
        });
    }
  }
}
