import { Division } from "src/app/network/model/division.model";
import { GarbageStation } from "src/app/network/model/garbage-station.model";

export class GarbageStationModel extends GarbageStation{
  /** 居委会 */
  Committees?:Division;
  /** 街道 */
  County?:Division;
  /** 区 */
  City?:Division;
}