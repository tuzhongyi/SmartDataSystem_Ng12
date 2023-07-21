import { Injectable } from '@angular/core';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { Medium } from 'src/app/common/tools/medium';
import { GetAIGarbageStationRfidCardRecordsParams } from 'src/app/network/request/ai-garbage/ai-garbage.params';
import { GetVodUrlParams } from 'src/app/network/request/ai-sr-server/sr-server.params';
import {
  CardRecordEpisodeRecordArgs,
  CardRecordEpisodeVideoArgs,
} from './card-record-episode.model';

import { CardRecordEpisodeService } from './card-record-episode.service';

@Injectable()
export class CardRecordEpisodeBusiness {
  constructor(private service: CardRecordEpisodeService) {}

  async record(args: CardRecordEpisodeRecordArgs) {
    let params = new GetAIGarbageStationRfidCardRecordsParams();
    params.BeginTime = args.duration.begin;
    params.EndTime = args.duration.end;
    if (args.stationId) {
      params.GarbageStationIds = [args.stationId];
    }
    params.PageIndex = 1;
    params.PageSize = 10;
    params.Desc = 'Time';
    let paged = await this.service.aiGarbage.rfid.cards.records.list(params);
    return paged.Data;
  }

  get(id: string) {
    return this.service.station.get(id);
  }
  playback(args: CardRecordEpisodeVideoArgs) {
    let params = new GetVodUrlParams();
    if (args.cameraId) {
      params.CameraId = args.cameraId;
    }
    let duration = DateTimeTool.beforeOrAfter(args.time);
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    return this.service.sr.playback(params);
  }
  img(id: string) {
    return Medium.data(id);
  }
}
