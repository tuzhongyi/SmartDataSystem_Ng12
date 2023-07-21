import { Duration } from 'src/app/network/model/duration.model';

export class CardRecordEpisodeRecordArgs {
  duration!: Duration;
  stationId?: string;
}
export class CardRecordEpisodeVideoArgs {
  time: Date = new Date();
  cameraId?: string;
}
export interface CardRecordEpisodeUrl {
  video?: string;
  image?: string;
  web?: string;
}
