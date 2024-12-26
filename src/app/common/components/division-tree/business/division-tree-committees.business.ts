import { ArrayTool } from 'src/app/common/tools/array-tool/array.tool';
import { DivisionTreeService } from '../service/division-tree.service';

export class DivisionTreeCommitteesBusiness {
  constructor(private service: DivisionTreeService) {}
  children(parentId: string) {
    return this.service.children(parentId);
  }
  async list(depth: number, showstation: boolean) {
    let committees = await this.service.committees.list();
    if (!showstation) return committees;

    let stations = await this.service.station.list();
    let datas = [...committees, ...stations];
    return datas;
  }

  async search(name: string, depth: number, showstation: boolean) {
    if (!showstation) {
      return this.search1(name);
    }
    return this.search2(name);
  }

  private search1(name: string) {
    return this.service.committees.search(name);
  }
  private async search2(name: string) {
    let stations = await this.service.station.search(name);
    let divisionIds = stations.map((x) => x.DivisionId!);
    divisionIds = ArrayTool.distinct(divisionIds, false);
    let committees = await this.service.committees.search(name, divisionIds);
    return [...committees, ...stations];
  }
}
