import { Component, OnInit } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { EventType } from 'src/app/enum/event-type.enum';
import { UserUIType } from 'src/app/enum/user-ui-type.enum';
import {
  EventRecordWindowDetailsBusiness,
  EventRecordWindowDetailsProviders,
} from '../../../event-record-window/tab-items/event-record-window-details/business/event-record-window-details.business';
import { HowellGarbageDropStationWindowItemDetailsController } from './garbage-drop-window-item-details.model';

@Component({
  selector: 'garbage-drop-window-item-details',
  templateUrl: './garbage-drop-window-item-details.component.html',
  styleUrls: ['./garbage-drop-window-item-details.component.less'],
  providers: [...EventRecordWindowDetailsProviders],
})
export class GarbageDropStationWindowItemDetailsComponent implements OnInit {
  constructor(
    howell: EventRecordWindowDetailsBusiness,
    local: LocalStorageService,
    private global: GlobalStorageService
  ) {
    this.ui = local.user.UIType ?? UserUIType.garbage;
    this.loadhowell(howell).then((x) => {
      this.howell = x;
    });
  }

  ui: UserUIType;
  UserUIType = UserUIType;

  howell?: HowellGarbageDropStationWindowItemDetailsController;

  async ngOnInit() {}

  private async loadhowell(business: EventRecordWindowDetailsBusiness) {
    let controller: HowellGarbageDropStationWindowItemDetailsController = {
      business: business,
      types: [EventType.GarbageDrop, EventType.GarbageDropTimeout],
    };
    let division = await this.global.division.selected;
    controller.division = await business.division.get(division.Id);
    return controller;
  }
}
