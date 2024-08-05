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
}
