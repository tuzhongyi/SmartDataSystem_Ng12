import { ArrayTool } from 'src/app/common/tools/array-tool/array.tool';
import { DivisionTreeService } from '../service/division-tree.service';

export class DivisionTreeCountyBusiness {
  constructor(private service: DivisionTreeService) {}
  children(parentId: string) {
    return this.service.children(parentId);
  }
  async list(depth: number, showstation: boolean) {
    let counties = await this.service.county.list();
    if (depth < 1) return counties;
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
    let divisionIds = stations.map((x) => x.DivisionId!);
    divisionIds = ArrayTool.distinct(divisionIds, false);
    let committees = await this.service.committees.search(name, divisionIds);
    divisionIds = committees.map((x) => x.ParentId!);
    divisionIds = ArrayTool.distinct(divisionIds, false);
    let counties = await this.service.county.search(name, divisionIds);
    return [...counties, ...committees, ...stations];
  }
}
