import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { Medium } from 'src/app/common/tools/medium';
import { CameraAIEventRecord } from 'src/app/network/model/garbage-station/camera-ai-event-record.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetCameraAIEventRecordsParams } from 'src/app/network/request/ai-camera-event/camera-ai-event.params';
import { CameraAIEventRequestService } from 'src/app/network/request/ai-camera-event/camera-ai-event.service';
import {
  AIOPRecordCameraEventTableArgs,
  AIOPRecordCameraEventTableItem,
} from './aiop-record-camera-event-table.model';

@Injectable()
export class AIOPRecordCameraEventTableBusiness
  implements
    IBusiness<
      PagedList<CameraAIEventRecord>,
      PagedList<AIOPRecordCameraEventTableItem>
    >
{
  constructor(private service: CameraAIEventRequestService) {}
  async load(
    index: number,
    size: number,
    args: AIOPRecordCameraEventTableArgs
  ): Promise<PagedList<AIOPRecordCameraEventTableItem>> {
    let data = await this.getData(index, size, args);
    let paged = new PagedList<AIOPRecordCameraEventTableItem>();
    paged.Page = data.Page;
    paged.Data = data.Data.map((x) => this.convert(x));
    return paged;
  }
  getData(
    index: number,
    size: number,
    args: AIOPRecordCameraEventTableArgs
  ): Promise<PagedList<CameraAIEventRecord>> {
    let params = new GetCameraAIEventRecordsParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.BeginTime = args.duration.begin;
    params.EndTime = args.duration.end;
    if (args.type !== undefined) {
      params.EventTypes = [args.type];
    }

    if (args.modelId) {
      params.ModelIds = [args.modelId];
    }

    params.ResourceName = args.name;

    return this.service.list(params);
  }

  convert(source: CameraAIEventRecord) {
    let plain = instanceToPlain(source);
    let model = plainToInstance(AIOPRecordCameraEventTableItem, plain);
    model.url = Medium.img(source.ImageUrl);
    return model;
  }
}
