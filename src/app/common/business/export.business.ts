import { Injectable } from "@angular/core";
import { IConverter } from "../interfaces/converter.interface";
import { HowellCSV } from "../tools/exports/hw-export-csv";
import { HowellExcel } from "../tools/exports/hw-export-excel";
import { HowellExportModel } from "../tools/exports/hw-export.model";

@Injectable({
    providedIn: "root"
})
export class ExportBusiness {
    excel<T>(title: string, headers:string[], datas: T, converter: IConverter<T, HowellExportModel>) {
        let excel = new HowellExcel();
        let model = converter.Convert(datas)
        model.headers = headers;
        model.title = title;
        excel.setData(model)
        excel.save(title);
    }
    csv<T>(title: string, headers:string[], datas: T, converter: IConverter<T, HowellExportModel>) {
        let model = converter.Convert(datas)
        model.title = title;
        model.headers = headers;
        HowellCSV.writeFile(title, model)
    }
}