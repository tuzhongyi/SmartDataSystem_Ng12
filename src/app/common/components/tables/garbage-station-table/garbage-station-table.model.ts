import { ImageControlModel } from '../../../../view-model/image-control.model';
import { GarbageStationModel } from '../../../../view-model/garbage-station.model';
import {
  SearchOptionKey,
  SearchOptions,
} from 'src/app/view-model/search-options.model';
import { StationState } from 'src/app/enum/station-state.enum';

export class GarbageStationTableModel {
  GarbageStation?: GarbageStationModel;
  stateClassName: string = '';
  stateName: string = '';
  images: ImageControlModel[] = [];
}
