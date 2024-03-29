import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UrlTool } from 'src/app/common/tools/url-tool/url.tool';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import { DeviceSession } from 'src/app/network/model/html2tcp/device-session.model';
import { IPEndPoint } from 'src/app/network/model/html2tcp/ip-end-point.model';
import { AIGarbageDeviceModel } from '../ai-garbage-station-device-session-list/ai-garbage-station-device-session-list.model';
import { LocalDeviceSelection } from './ai-garbage-station-device-session-manager.model';
import { AIGarbageStationDeviceSessionDeviceBusiness } from './business/ai-garbage-station-device-session-device.business';
import { AIGarbageStationDeviceSessionManagerBusiness } from './business/ai-garbage-station-device-session-manager.business';

@Component({
  selector: 'ai-garbage-station-device-session-manager',
  templateUrl: './ai-garbage-station-device-session-manager.component.html',
  styleUrls: ['./ai-garbage-station-device-session-manager.component.less'],
  providers: [
    AIGarbageStationDeviceSessionDeviceBusiness,
    AIGarbageStationDeviceSessionManagerBusiness,
  ],
})
export class AIGarbageStationDeviceSessionManagerComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private business: AIGarbageStationDeviceSessionManagerBusiness
  ) {}

  ele = {
    url: '',
    host: '',
    port: 80,
  };
  selection = new LocalDeviceSelection();

  device?: AIGarbageDevice;
  session?: DeviceSession;
  window?: Window;

  ngOnInit(): void {
    this.onloadselection();
  }

  ondevice(item: AIGarbageDeviceModel) {
    this.device = item;
    this.session = item.session;
    if (this.session) {
      this.ele.url = UrlTool.get(this.session.HttpHost, this.session.HttpPort);
      this.onloadselection();
    } else {
      this.clear();
    }
  }

  clear() {
    this.ele.url = '';
    this.ele.port = 80;
    this.ele.host = '';
    this.selection.clear();
  }

  onloadselection() {
    if (this.session) {
      this.selection.clear();
      this.business.load(this.session.DeviceId).then((x) => {
        this.selection.datas = x;
        this.selection.selected = this.selection.datas.find(
          (x) =>
            x.Forwarding.Address === this.session?.Forwarding?.Address &&
            x.Forwarding.Port === this.session?.Forwarding?.Port
        );
        if (this.selection.selected) {
          this.ele.host = this.selection.selected.Forwarding.Address;
          this.ele.port = this.selection.selected.Forwarding.Port;
        }
      });
    }
  }

  onselect() {
    if (this.selection.selected) {
      this.ele.host = this.selection.selected.Forwarding.Address;
      this.ele.port = this.selection.selected.Forwarding.Port;
    }
  }

  onforwarding() {
    if (this.device && this.ele.host && this.ele.port) {
      let forwarding = new IPEndPoint();
      forwarding.Address = this.ele.host;
      forwarding.Port = this.ele.port;
      this.business
        .forwarding(this.device.Id, forwarding)
        .then((x) => {
          this.toastr.success('操作成功');
        })
        .catch((e) => {
          this.toastr.error('操作失败');
        });
    }
  }

  onopen() {
    if (this.device && this.ele.url) {
      let _url = UrlTool.set(this.ele.url, `?_${new Date().getTime()}`);
      this.toopen(_url, this.device.Id);
    }
  }
  toopen(url: string, name: string) {
    if (this.window && this.window.closed == false) {
      this.window.location.href = url;
      this.window.focus();
    } else {
      var w = screen.availWidth;
      var h = screen.availHeight;
      this.window =
        window.open(
          url,
          name,
          'width=' + w + ',height=' + h + ',top=0,left=0,,incognito=yes'
        ) ?? undefined;
    }
  }
}
