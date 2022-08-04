

export interface CommonModelSource {
  [key: string]: any;
}

export abstract class CommonModelConverter<T, M = any> {
  abstract Convert(source: CommonModelSource, ...res: any[]): T;

  iterateToModel(data: M[]) {
    let res: T[] = [];
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      const model = this.Convert(item);
      res.push(model)
    }
    return res;
  }
}


export abstract class CommonModelPromiseConverter<T, M = any> {
  abstract Convert(source: CommonModelSource, ...res: any[]): Promise<T>;

  async iterateToModel(data: M[]) {
    let res: T[] = [];
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      const model = await this.Convert(item);
      res.push(model)
    }
    return res;
  }
}

