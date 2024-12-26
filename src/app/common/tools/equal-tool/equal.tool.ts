import { IIdModel } from 'src/app/network/model/model.interface';

export class EqualTool {
  static equal<T>(a: T, b: T): boolean {
    if (a === b) {
      return true;
    }
    if (a === null || b === null || a === undefined || b === undefined) {
      return false;
    }
    if (typeof a === 'object' && typeof b === 'object') {
      if ('Id' in a && 'Id' in b) {
        return this.IIdModel(a as any, b as any);
      }
    }
    return false;
  }
  private static IIdModel(a: IIdModel, b: IIdModel) {
    return a.Id === b.Id;
  }
}
