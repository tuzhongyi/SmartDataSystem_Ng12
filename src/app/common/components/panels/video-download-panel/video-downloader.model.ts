import { DurationParams } from 'src/app/network/request/IParams.interface';

export class VideoDownloader extends DurationParams {
  constructor(
    name: string,
    cameraId: string,
    stationId: string,
    interval: DurationParams
  ) {
    super();
    this.name = name;
    this.cameraId = cameraId;
    this.stationId = stationId;
    this.BeginTime = interval.BeginTime;
    this.EndTime = interval.EndTime;
  }
  name: string;
  cameraId: string;
  stationId: string;
}
