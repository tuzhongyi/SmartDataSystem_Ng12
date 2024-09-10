import { Duration } from 'src/app/network/model/garbage-station/duration.model';

export class VideoDownloader implements Duration {
  constructor(
    name: string,
    cameraId: string,
    stationId: string,
    interval: Duration
  ) {
    this.name = name;
    this.cameraId = cameraId;
    this.stationId = stationId;
    this.begin = interval.begin;
    this.end = interval.end;
  }
  begin: Date;
  end: Date;

  name: string;
  cameraId: string;
  stationId: string;
}
