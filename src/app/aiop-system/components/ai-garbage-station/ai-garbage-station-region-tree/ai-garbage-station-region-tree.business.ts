import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import {
  AIGarbageDeviceModel,
  AIGarbageRegionTreeArgs,
  TreeSourceType,
} from './ai-garbage-station-region-tree.model';
import { AIGarbageRegionTreeService } from './ai-garbage-station-region-tree.service';

@Injectable()
export class AIGarbageRegionTreeBusiness {
  constructor(private service: AIGarbageRegionTreeService) {}
  async load(args: AIGarbageRegionTreeArgs) {
    let data: Array<TreeSourceType>;

    if (args.showDevice) {
      data = await this.getDataByDevice(args.name);
    } else if (args.showRegion) {
      data = await this.getDataByRegion(args.name);
    } else {
      data = await this.getDataByDivision();
    }
    return data;
  }

  private async getDataByDivision() {
    let regions = await this.service.regions();

    let divisionIds = regions
      .filter((x) => !!x.DivisionId)
      .map((x) => x.DivisionId!);
    // 去重
    divisionIds = Array.from(new Set(divisionIds));
    let divisions = await this.service.divisions(divisionIds);
    return [...divisions];
  }
  private async getDataByRegion(name?: string) {
    let regions = await this.service.regions();
    if (name) {
      regions = regions.filter((x) => {
        return x.Name.toLowerCase().includes(name);
      });
    }

    let divisionIds = regions
      .filter((x) => !!x.DivisionId)
      .map((x) => x.DivisionId!);
    // 去重
    divisionIds = Array.from(new Set(divisionIds));
    let divisions = await this.service.divisions(divisionIds);
    return [...divisions, ...regions];
  }
  private async getDataByDevice(name?: string) {
    let devices = (await this.service.devices()).map((x) => this.devices(x));
    if (name) {
      devices = devices.filter((x) => x.Name.toLowerCase().includes(name));
    }
    let regionIds = devices
      .filter((x) => !!x.RegionId)
      .map((x) => x.RegionId) as string[];
    let regions = await this.service.regions(regionIds);

    let divisionIds = regions
      .filter((x) => !!x.DivisionId)
      .map((x) => x.DivisionId!);
    let divisions = await this.service.divisions(divisionIds);

    return [...divisions, ...regions, ...devices];
  }

  private devices(source: AIGarbageDevice) {
    let plain = instanceToPlain(source);
    return plainToInstance(AIGarbageDeviceModel, plain);
  }
}
