import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import {
  PatrolControlConfig,
  PatrolControlModel,
} from 'src/app/garbage-system/components/patrol-control/patrol-control.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { CommitteesIndexNavicationBusiness } from './committees-index-navication.business';

@Injectable()
export class CommitteesIndexPatrolControlBusiness extends WindowViewModel {
  constructor(
    private navication: CommitteesIndexNavicationBusiness,
    private stationService: GarbageStationRequestService
  ) {
    super();
  }

  fullscreen = false;
  station?: GarbageStation;
  config: PatrolControlConfig = {
    title: false,
    interval: false,
    close: false,
    status: false,
    stop: false,
    autoplay: false,
    playback: true,
    operation: {
      play: true,
      fullscreen: false,
    },
  };

  onclose() {
    this.show = false;
    this.fullscreen = false;
  }

  onfullscreen() {
    this.fullscreen = !this.fullscreen;
  }

  onselected(model: PatrolControlModel) {
    this.stationService.cache.get(model.id).then((station) => {
      this.navication.selected = station;
    });
  }
}
