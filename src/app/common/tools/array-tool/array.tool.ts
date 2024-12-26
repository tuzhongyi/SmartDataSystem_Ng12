export class ArrayTool {
  static groupBy<T>(array: T[], fn: (item: T) => string): T[][] {
    let result = array.reduce((data: any, item) => {
      const key = fn(item);
      if (!data[key]) {
        data[key] = [];
      }
      data[key].push(item);
      return data;
    }, {});
    return Object.values(result);
  }
  static distinct<T>(datas: T[], cannull = true) {
    let items: T[] = [...datas];
    if (!cannull) {
      items = datas.filter((x) => x !== null && x !== undefined);
    }

    return Array.from(new Set<T>(items));
  }
}
