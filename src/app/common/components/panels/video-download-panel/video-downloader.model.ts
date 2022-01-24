import { IntervalParams } from 'src/app/network/request/IParams.interface';

export class VideoDownloader extends IntervalParams {
  constructor(
    name: string,
    cameraId: string,
    stationId: string,
    interval: IntervalParams
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
