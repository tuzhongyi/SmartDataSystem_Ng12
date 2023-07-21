import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';

@Injectable()
export class MonitorCardRecordEpisodeWindow extends WindowViewModel {
  style = {
    width: '70%',
    height: '70%',
  };
  record?: EventRecordViewModel;
}
