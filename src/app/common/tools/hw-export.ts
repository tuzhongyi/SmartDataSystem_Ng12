import * as XLSX from 'xlsx';

interface KeyValue {
  [key: string]: string;
}

export class HwExport {
  static exportCSV(title: string, data: Array<any>, columns?: string[]) {

  }
  static exportXLXS(title: string, header: string[], data: Array<KeyValue>,) {
    // 创建工作簿
    let workbook = XLSX.utils.book_new();


    // 创建空的工作表
    let worksheet = XLSX.utils.aoa_to_sheet([[]]);
    // XLSX.utils.sheet_add_aoa(worksheet, [[title]], { origin: { r: 0, c: columnInfo ? Math.ceil(columnInfo.columnNum / 2) : 0 } });

    // 添加表头
    XLSX.utils.sheet_add_aoa(worksheet, [header])

    XLSX.utils.sheet_add_json(worksheet, data, { origin: -1, skipHeader: true })

    let columnInfo = this._getColumnInfo(header, data);;

    worksheet["!cols"] = columnInfo?.columWidth ?? [];

    console.log(worksheet)
    // 工作表添加到工作簿中
    XLSX.utils.book_append_sheet(workbook, worksheet);

    // 将工作簿导出
    XLSX.writeFile(workbook, title + ".xlsx", { bookType: 'xlsx' });
  }
  private static _getColumnInfo(header: string[], data: Array<KeyValue>) {
    let columnWidth = header.map(str => ({ wch: str.replace(/[^\x00-\xff]/g, '00').length }))
    let info: columnInfo = {
      columnNum: header.length,
      columWidth: columnWidth
    }
    console.log(info)

    if (data.length) {
      let obj = data[0];
      let keys = Object.keys(obj);
      let len = keys.length;

      // 获取每列的最大宽度
      data.forEach(row => {
        for (let i = 0; i < len; i++) {
          let value = row[keys[i]];
          let c = 0;
          c = value.replace(/[^\x00-\xff]/g, '00').length
          if (c > info.columWidth[i].wch) info.columWidth[i] = { wch: c };
        }
      })

      info.columWidth.forEach(column => column.wch += 5)

    }
    return info
  }
}
interface columnInfo {
  columnNum: number;
  columWidth: Array<any>
}