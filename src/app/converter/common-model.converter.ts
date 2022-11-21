export interface CommonModelSource {
  [key: string]: any;
}

export type modelSource = CommonModelSource | CommonModelSource[];

export abstract class AbstractCommonModelConverter<T> {
  abstract Convert(source: modelSource, ...res: any[]): T;

  iterateToModel(data: CommonModelSource[]) {
    let res: T[] = [];
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      const model = this.Convert(item);
      res.push(model);
    }
    return res;
  }
}

export abstract class AbstractCommonModelPromiseConverter<T> {
  abstract Convert(source: modelSource, ...res: any[]): Promise<T>;

  async iterateToModel(data: modelSource[]) {
    let res: T[] = [];
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      const model = await this.Convert(item);
      res.push(model);
    }
    return res;
  }
}
