import * as XLSX from 'xlsx';

interface KeyValue {
  [key: string]: string;
}

export class HwExport {
  static exportCSV(title: string, data: Array<any>, columns?: string[]) {

  }
  static exportXLXS(title: string, header: string[], data: Array<KeyValue>, columns?: string[]) {
    // 创建工作簿
    let workbook = XLSX.utils.book_new();

    // 创建工作表并填入数据
    let columnInfo = this._getMaxWidth(data);;

    // 创建空的工作表
    let worksheet = XLSX.utils.aoa_to_sheet([[]]);
    XLSX.utils.sheet_add_aoa(worksheet, [[title]], { origin: { r: 0, c: columnInfo ? Math.ceil(columnInfo.columnNum / 2) : 0 } });

    // 添加表头
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: -1 })

    XLSX.utils.sheet_add_json(worksheet, data, { origin: -1, skipHeader: true })

    worksheet["!cols"] = columnInfo?.columWidth ?? [];

    console.log(worksheet)
    // 工作表添加到工作簿中
    XLSX.utils.book_append_sheet(workbook, worksheet);

    // 将工作簿导出
    XLSX.writeFile(workbook, title + ".xlsx", { bookType: 'xlsx' });
  }
  private static _getMaxWidth(data: Array<KeyValue>) {
    if (data.length) {
      let obj = data[0];
      let keys = Object.keys(obj);
      let len = keys.length;
      let arr = Array.from(Array(len), (v, i) => i);

      data.forEach(row => {
        for (let i = 0; i < len; i++) {
          let value = row[keys[i]];
          let c = 0;
          for (let i = 0; i < value.length; i++) {
            let code = value.codePointAt(i)!.toString(16);
            c += code.length / 2
          }
          if (c > arr[i]) arr[i] = c;
        }
      })

      let columnWidth = arr.map(v => ({ wch: v }))

      let info: columnInfo = {
        columnNum: len,
        columWidth: columnWidth
      }
      return info
    }
    return null;
  }
}
interface columnInfo {
  columnNum: number;
  columWidth: Array<any>
}