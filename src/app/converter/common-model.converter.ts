export interface CommonModelSource {
  [key: string]: any;
}

export abstract class AbstractCommonModelConverter<
  T,
  M extends CommonModelSource = CommonModelSource
> {
  abstract Convert(source: M, ...res: any[]): T;

  iterateToModel(data: M[]) {
    let res: T[] = [];
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      const model = this.Convert(item);
      res.push(model);
    }
    return res;
  }
}

export abstract class AbstractCommonModelPromiseConverter<
  T,
  M extends CommonModelSource = CommonModelSource
> {
  abstract Convert(source: M, ...res: any[]): Promise<T>;

  async iterateToModel(data: M[]) {
    let res: T[] = [];
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      const model = await this.Convert(item);
      res.push(model);
    }
    return res;
  }
}
