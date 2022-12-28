/*
 * @Author: pmx
 * @Date: 2022-12-28 10:46:58
 * @Last Modified by:   pmx
 * @Last Modified time: 2022-12-28 10:46:58
 */
/**
 *   arr = [
      '清华大学',
      '北京大学',
      '复旦大学',
      '上海交通大学',
      '浙江大学',
    ];

    arr.sort()按照Unicode来排序，而汉字的 Unicode 是杂乱无章的 
     ['上海交通大学', '北京大学', '复旦大学', '浙江大学', '清华大学']

     使用Intl.Collator能得到按字典排序的正确结果
      ['北京大学', '复旦大学', '清华大学', '上海交通大学', '浙江大学']
 * 
 */
export class LocaleCompare {
  static compare(a: string, b: string, isAsc: boolean = false) {
    if (this._localeCompareSupportsLocales()) {
      let collator = new Intl.Collator('zh-CN', {
        caseFirst: 'upper',
        sensitivity: 'variant',
        numeric: true,
      });
      return collator.compare(a, b) * (isAsc ? 1 : -1);
    } else {
      return (a.length - b.length || a.localeCompare(b)) * (isAsc ? 1 : -1);
    }
  }
  private static _localeCompareSupportsLocales() {
    try {
      'foo'.localeCompare('bar', 'i');
    } catch (e: any) {
      return e.name === 'RangeError';
    }
    return false;
  }
}
