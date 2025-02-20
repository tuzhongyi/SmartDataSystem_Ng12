import { Injectable } from '@angular/core';
import { ArrayTool } from 'src/app/common/tools/array-tool/array.tool';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { DivisionTreeService } from '../service/division-tree.service';

@Injectable()
export class DivisionTreeCityBusiness {
  constructor(private service: DivisionTreeService) {}

  async children(parentId: string) {
    let division = await this.service.get(parentId);
    if (division.DivisionType === DivisionType.Committees) {
      return this.service.station.list(parentId);
    }
    return this.service.children(parentId);
  }
  async list(depth: number, showstation: boolean) {
    let cities = await this.service.city.list();
    if (depth < 1) return cities;
    let counties = await this.service.county.list();
    if (depth < 2) return counties;
    let committees = await this.service.committees.list();
    if (!showstation) return [...counties, ...committees];
    let stations = await this.service.station.list();
    return [...counties, ...committees, ...stations];
  }

  async search(name: string, depth: number, showstation: boolean) {
    if (depth < 0) {
      return this.search1(name);
    }
    if (!showstation) {
      return this.search2(name);
    }
    return this.search3(name);
  }

  private async search1(name: string) {
    return this.service.county.search(name);
  }
  private async search2(name: string) {
    let committees = await this.service.committees.search(name);
    let divisionIds = committees.map((x) => x.ParentId!);
    divisionIds = ArrayTool.distinct(divisionIds, false);
    let counties = await this.service.county.search(name, divisionIds);
    return [...counties, ...committees];
  }
  private async search3(name: string) {
    let stations = await this.service.station.search(name);
    let committeeIds = stations.map((x) => x.DivisionId!);
    committeeIds = ArrayTool.distinct(committeeIds, false);
    let committees = await this.service.committees.search(name, committeeIds);
    let countyIds = committees.map((x) => x.ParentId!);
    countyIds = ArrayTool.distinct(countyIds, false);
    let counties = await this.service.county.search(name, countyIds);
    let cityIds = counties.map((x) => x.ParentId!);
    cityIds = ArrayTool.distinct(cityIds, false);
    let cities = await this.service.city.search(name, cityIds);

    return [...cities, ...counties, ...committees, ...stations];
  }
}
