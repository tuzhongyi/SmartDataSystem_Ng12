import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/common/service/store.service';
import { MQTTEventService } from 'src/app/network/request/mqtt-event/mqtt-event.service';
import { CommitteesNavicationConverter } from '../navication/navication.component.converter';
import { ElectricBikeIndexAlarmBusiness } from './business/index-alram.business';
import { ElectricBikeIndexDeviceStatusBusiness } from './business/index-device-status.business';
import { ElectricBikeIndexDeviceStatisticBusiness } from './business/index-statistic.business';
import { WindowBussiness } from './business/window/index-window.business';
import { ElectricBikeIndexBusiness } from './business/index.component.business';
import { ElectricBikeIndexNavicationBusiness } from './business/index.navication.business';
import { MapControlBusiness } from './business/map-control.business';
import { PatrolControlBusiness } from './business/patrol-control.business';
import { VideoControlWindowBusiness } from './business/video-control-window.business';
import { ElectricBikeWindowBusinesses } from './business/window/window.moudle';
import { ElectricBikeIndexService } from './index.component.service';
import { Title } from '@angular/platform-browser';
import { EventType } from 'src/app/enum/event-type.enum';

@Component({
  selector: 'howell-electric-bike-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
  providers: [
    ElectricBikeIndexService,
    ElectricBikeIndexBusiness,
    ElectricBikeIndexNavicationBusiness,
    PatrolControlBusiness,
    ElectricBikeIndexAlarmBusiness,
    MapControlBusiness,
    VideoControlWindowBusiness,
    WindowBussiness,
    ElectricBikeIndexDeviceStatusBusiness,
    ElectricBikeIndexDeviceStatisticBusiness,
    ...ElectricBikeWindowBusinesses,
  ],
})
export class ElectricBikeIndexComponent implements OnInit {
  constructor(
    titleService: Title,
    public business: ElectricBikeIndexBusiness,
    public navication: ElectricBikeIndexNavicationBusiness,
    private service: ElectricBikeIndexService,
    private store: StoreService,
    public patrol: PatrolControlBusiness,
    public map: MapControlBusiness,
    public video: VideoControlWindowBusiness,
    public window: WindowBussiness,
    public alarm: ElectricBikeIndexAlarmBusiness,
    private mqtt: MQTTEventService,
    public device: ElectricBikeIndexDeviceStatusBusiness,
    public statistic: ElectricBikeIndexDeviceStatisticBusiness
  ) {
    titleService.setTitle('智能车棚管理平台');
  }

  converter = {
    navication: new CommitteesNavicationConverter(),
  };

  ngOnInit(): void {
    this.initNavication();
  }
  async initNavication() {
    let root = await this.service.getDivision();
    this.mqtt.listenerStationEvent(undefined, EventType.Smoke);
    this.navication.root = this.converter.navication.Convert(root);
    let children = await this.service.getChildren(root.Id);
    this.navication.children = children.map((x) => {
      return this.converter.navication.Convert(x);
    });
    this.mqtt.pushService.pushEvent.subscribe((x) => {
      this.store.refresh.emit();
    });
  }
}
