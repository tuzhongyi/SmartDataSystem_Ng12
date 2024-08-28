import { instanceToPlain } from 'class-transformer';
import { RecordFileUrl } from 'src/app/network/model/url.model';
import { GarbageStationUrl } from 'src/app/network/url/garbage/garbage-station.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import {
  CameraDownloadFileParams,
  CameraUploadFileParams,
} from '../garbage-station-request.params';

export class GarbageStationCameraFileRequestService {
  constructor(private basic: HowellBaseRequestService) {
    this.basicType = this.basic.type(RecordFileUrl);
  }

  private basicType: HowellBaseTypeRequestService<RecordFileUrl>;
  async download(
    params: CameraDownloadFileParams
    // percent: (percent: number) => void,
    // completely: (completely: boolean) => void
  ): Promise<RecordFileUrl> {
    let data = instanceToPlain(params);
    let url = GarbageStationUrl.camera(params.GarbageStationId).files(
      params.CameraId,
      data.BeginTime,
      data.EndTime
    );
    return await this.basic.post(url, RecordFileUrl, params);

    // this.basic.http.downloadFile(url, percent, completely);
  }
  upload(params: CameraUploadFileParams): Promise<RecordFileUrl> {
    let data = instanceToPlain(params);
    let url = GarbageStationUrl.camera(params.GarbageStationId).files(
      params.CameraId,
      data.BeginTime,
      data.EndTime
    );
    return this.basicType.post(url);
  }
}
