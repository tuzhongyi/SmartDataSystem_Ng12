import { Injectable } from '@angular/core';
import { Medium } from 'src/app/common/tools/medium';
import { GetVodUrlParams } from 'src/app/network/request/ai-sr-server/sr-server.params';
import { CardRecordEpisodeService } from './card-record-episode.service';

@Injectable()
export class CardRecordEpisodeBusiness {
  constructor(private service: CardRecordEpisodeService) {}
  get(id: string) {
    return this.service.station.get(id);
  }
  playback(cameraId: string, date: Date) {
    let params = new GetVodUrlParams();
    params.CameraId = cameraId;

    let begin = new Date(date.getTime());
    let end = new Date(date.getTime());
    end.setMinutes(end.getMinutes() + 5);

    params.BeginTime = begin;
    params.EndTime = end;
    return this.service.sr.playback(params);
  }
  img(id: string) {
    return Medium.data(id);
  }
}
