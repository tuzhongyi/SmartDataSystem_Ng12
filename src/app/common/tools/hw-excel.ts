import { Buffer, Workbook, Worksheet } from 'exceljs';
import * as fs from 'file-saver';

class HowellExcelJS {
    
    private _book? : Workbook;
    public get book() : Workbook {
        if(!this._book)
        {
            this._book = new Workbook()
        }
        return this._book;
    }    

    addWorksheet(sheetName: string) {
        return this.book.addWorksheet(sheetName);
    }

    getWorksheet(sheetName: string) {
        return this.book.getWorksheet(sheetName);
    }

    load(data: Buffer) {
        return this.book.xlsx.load(data)
    }

    setCellValue(worksheet: Worksheet, row: number, column:number, val: string|number) {
        const cell = worksheet.getCell(row, column);
        cell.value = val;        
    }

    mergeCells(worksheet: Worksheet, top:number, left:number, bottom:number, right:number) {
        return worksheet.mergeCells([top, left, bottom, right]);
    }


    addImageToBook(base64Image: string) {
        return this.book.addImage({
            base64: base64Image,
            extension: 'png',
        });
    }

    addImageToSheet(worksheet: Worksheet, imageId: number, cell: string) {
        worksheet.getCell(cell).fill = {
            type: 'pattern',
            pattern: 'darkTrellis',
            bgColor: { argb: 'FF0C1127' }
        };
        return worksheet.addImage(imageId, cell);
    }

    writeFile(filename: string, extension: string) {
        extension = extension || '.xlsx';
        this.book.xlsx.writeBuffer().then(x => {
            let blob = new Blob([x], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
            fs.saveAs(blob, filename + extension);
        });
    }

    getBuffer(): Promise<Buffer> {
        return this.book.xlsx.writeBuffer()
    }


}







export class HowellExcel {
    excel = new HowellExcelJS();

    setData(datas:Array<IExcelValue>){
        let sheet = this.excel.addWorksheet("Table")        
        for (let i = 0; i < datas.length; i++) {
            const data = datas[i];
            this.excel.setCellValue(sheet, data.row, data.column, data.value)
        }
    }
    setRowData(row:number, datas:IExcelColumnValue[]){
        let values = datas.map(x=>{
            return {
                ...x,
                row:row
            }
        })
        this.setData(values)
    }
    save(filename:string){
        this.excel.writeFile(filename, ".xls")
    }

}

export interface IExcelColumnValue{
    column:number,
    value:string|number;
}
export interface IExcelValue  extends IExcelColumnValue{    
    row:number,
}


