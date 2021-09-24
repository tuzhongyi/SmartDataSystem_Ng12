import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/business/Ibusiness';
import { BatchRequest } from '../../model/batch-request.model';
import { BatchResult } from '../../model/batch-result.model';
import { GridCell } from '../../model/grid-cell.model';
import { PagedList } from '../../model/page-list.model';
import { GridCellUrl } from '../../url/garbage/grid-cells.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { IParams } from '../IParams.interface';
import { GetGridCellsParams } from './grid-cell-request.params';

@Injectable({
  providedIn: 'root',
})
export class StationRequestService implements IBusiness<GridCell> {
  basic: BaseRequestService;
  type: BaseTypeRequestService<GridCell>;
  constructor(private _http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(GridCell);
  }
  delete(id: string): Promise<GridCell> {
    let url = GridCellUrl.item(id);
    return this.type.delete(url);
  }
  get(id: string): Promise<GridCell> {
    let url = GridCellUrl.item(id);
    return this.type.get(url);
  }
  update(data: GridCell): Promise<GridCell> {
    let url = GridCellUrl.item(data.Id);
    return this.type.put(url, data);
  }
  create(data: GridCell): Promise<GridCell> {
    let url = GridCellUrl.basic();
    return this.type.post(url, data);
  }
  list(args: GetGridCellsParams): Promise<PagedList<GridCell>> {
    let url = GridCellUrl.list();
    return this.type.paged(url, args);
  }

  garbageStations(id: string, request: BatchRequest): Promise<BatchResult> {
    let url = GridCellUrl.garbagestations(id);
    return this.basic.post(url, BatchResult, request);
  }

  
}
