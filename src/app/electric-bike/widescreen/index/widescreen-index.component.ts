import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/common/service/store.service';
import { MQTTEventService } from 'src/app/network/request/mqtt-event/mqtt-event.service';
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
import { ElectricBikeIndexService } from './widescreen-index.component.service';
import { Title } from '@angular/platform-browser';
import { EventType } from 'src/app/enum/event-type.enum';
import { CommitteesNavicationConverter } from '../../navication/navication.component.converter';
import { WidescreenIndexDisplay } from './widescreen-index.model';
import { Division } from 'src/app/network/model/division.model';
import { ElectricBikeIndexChildBusiness } from './business/index-dvisiion.business';

@Component({
  selector: 'howell-electric-bike-widescreen-index',
  templateUrl: './widescreen-index.component.html',
  styleUrls: ['./widescreen-index.component.less'],
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
    ElectricBikeIndexChildBusiness,
  ],
})
export class ElectricBikeWidescreenIndexComponent implements OnInit {
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
    public statistic: ElectricBikeIndexDeviceStatisticBusiness,
    public child: ElectricBikeIndexChildBusiness
  ) {
    titleService.setTitle('智能车棚管理平台');
  }
  display: WidescreenIndexDisplay = WidescreenIndexDisplay.status;
  WidescreenIndexDisplay = WidescreenIndexDisplay;

  root!: Division;
  children: Division[] = [];

  converter = {
    navication: new CommitteesNavicationConverter(),
  };

  ngOnInit(): void {
    this.initNavication();
  }
  async initNavication() {
    this.root = await this.service.getDivision();
    this.mqtt.listenerStationEvent(undefined, EventType.Smoke);
    this.navication.root = this.converter.navication.Convert(this.root);

    this.children = await this.service.getChildren(this.root.Id);
    this.navication.children = this.children.map((x) => {
      return this.converter.navication.Convert(x);
    });
    this.mqtt.pushService.pushEvent.subscribe((x) => {
      this.store.refresh.emit();
    });
  }

  onDisplayChange(display: WidescreenIndexDisplay) {
    this.display = display;
  }

  ondivisionclicked(child: Division) {
    this.store.divisionType = child.DivisionType;
    this.store.divisionId = child.Id;
    this.store.statusChange.emit();
  }
}
