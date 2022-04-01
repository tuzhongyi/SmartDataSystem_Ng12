import { formatDate } from "@angular/common";
import { TimeData } from "src/app/common/components/charts/chart.model";
import { IConverter } from "src/app/common/interfaces/converter.interface";
import { HowellExportModel } from "src/app/common/tools/exports/hw-export.model";

export class ExportExcelConverter implements IConverter<TimeData<any>[], HowellExportModel>{
    Convert(source: TimeData<any>[]): HowellExportModel {
        let model = new HowellExportModel();
        

        for (let i = 0; i < source.length; i++) {
            const data = source[i];
            let value = new Array();
            value.push(i + 1)
            value.push(formatDate(data.time, "yyyy年MM月dd日", "en"))
            value.push(formatDate(data.time, "HH:mm", "en"))
            value.push(data.value)
            model.datas.push(value);
        }
        return model;

    }
}