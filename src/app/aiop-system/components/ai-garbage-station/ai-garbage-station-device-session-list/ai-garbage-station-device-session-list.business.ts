import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { AIGarbageStationDeviceTableService } from 'src/app/common/components/tables/ai-garbage-station-tables/ai-garbage-station-device-table/ai-garbage-station-device-table.service';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  AIGarbageDeviceCommand,
  AIGarbageDeviceCommandNo,
} from 'src/app/network/model/ai-garbage/garbage-device-command.enum';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import { DeviceSession } from 'src/app/network/model/html2tcp/device-session.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetAIGarbageStationDevicesParams } from 'src/app/network/request/ai-garbage/ai-garbage.params';
import { Http2TCPRequestService } from 'src/app/network/request/http2tcp/http2tcp-request.service';
import {
  AIGarbageDeviceModel,
  AIGarbageStationDeviceSessionListArgs,
} from './ai-garbage-station-device-session-list.model';

@Injectable()
export class AIGarbageStationDeviceSessionListBusiness
  implements
    IBusiness<PagedList<AIGarbageDevice>, PagedList<AIGarbageDeviceModel>>
{
  constructor(
    private service: AIGarbageStationDeviceTableService,
    private http2tcp: Http2TCPRequestService
  ) {}

  async load(
    index: number,
    size: number,
    args: AIGarbageStationDeviceSessionListArgs
  ): Promise<PagedList<AIGarbageDeviceModel>> {
    let devices = await this.devices(index, size, args);
    let sessions = await this.sessions();
    let paged = new PagedList<AIGarbageDeviceModel>();
    paged.Page = devices.Page;
    paged.Data = devices.Data.map((x) => {
      return this.convert(x, sessions);
    });
    return paged;
  }
  getData(...args: any): Promise<PagedList<AIGarbageDevice>> {
    throw new Error('Method not implemented.');
  }

  convert(source: AIGarbageDevice, sessions: DeviceSession[]) {
    let plain = instanceToPlain(source);
    let model = plainToInstance(AIGarbageDeviceModel, plain);
    model.session = sessions.find((x) => x.DeviceId == source.Id);
    return model;
  }

  async devices(
    index: number,
    size: number,
    args: AIGarbageStationDeviceSessionListArgs
  ) {
    let params = new GetAIGarbageStationDevicesParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.GarbageStationName = args.name;
    if (args.divisionId) {
      let regions = await this.service.region.array(args.divisionId);
      params.RegionIds = regions.map((x) => x.Id);
    }
    if (args.regionId) {
      params.RegionIds = [args.regionId];
    }
    return this.service.ai.device.list(params);
  }

  sessions() {
    return this.http2tcp.array();
  }

  command(ids: string[]) {
    let command = new AIGarbageDeviceCommand();
    command.CommandNo = AIGarbageDeviceCommandNo.GCHATCP;
    let all = ids.map((id) => this.service.ai.device.command(id, command));
    return Promise.all(all);
  }
}
