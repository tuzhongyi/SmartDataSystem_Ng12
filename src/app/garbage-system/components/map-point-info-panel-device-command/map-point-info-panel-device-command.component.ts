import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Language } from 'src/app/common/tools/language';
import { AIGarbageDeviceCommandNo } from 'src/app/network/model/ai-garbage/garbage-device-command.enum';
import { MapPointInfoPanelDeviceCommandBusiness } from './map-point-info-panel-device-command.business';

@Component({
  selector: 'map-point-info-panel-device-command',
  templateUrl: './map-point-info-panel-device-command.component.html',
  styleUrls: ['./map-point-info-panel-device-command.component.less'],
  providers: [MapPointInfoPanelDeviceCommandBusiness],
})
export class MapPointInfoPanelDeviceCommandComponent implements OnInit {
  @Input() stationId?: string;

  constructor(
    private business: MapPointInfoPanelDeviceCommandBusiness,
    private toastr: ToastrService
  ) {}

  Language = Language;
  Command = AIGarbageDeviceCommandNo;

  ngOnInit(): void {}

  oncommand(command: AIGarbageDeviceCommandNo) {
    if (this.stationId) {
      this.business
        .command(this.stationId, command)
        .then((x) => {
          this.toastr.success('操作成功');
        })
        .catch((x) => {
          this.toastr.error('操作失败');
        });
    }
  }
}
