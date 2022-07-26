

export interface CommonModelSource {
  [key: string]: any;
}

export abstract class CommonModelConverter<T> {
  abstract Convert(source: CommonModelSource, ...res: any[]): T;

  iterateToModel<M extends CommonModelSource>(data: M[]) {
    let res: T[] = [];
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      const model = this.Convert(item);
      res.push(model)
    }
    return res;
  }
}


export abstract class CommonModelPromiseConverter<T> {
  abstract Convert(source: CommonModelSource, ...res: any[]): Promise<T>;

  async iterateToModel<M extends CommonModelSource>(data: M[]) {
    let res: T[] = [];
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      const model = await this.Convert(item);
      res.push(model)
    }
    return res;
  }
}

