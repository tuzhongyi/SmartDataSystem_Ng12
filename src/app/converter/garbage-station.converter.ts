// import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
// import { Division } from 'src/app/network/model/division.model';
// import { GarbageStation } from 'src/app/network/model/garbage-station.model';
// import { GarbageStationModel } from '../view-model/garbage-station.model';

// export class GarbageStationConverter
//   implements IPromiseConverter<GarbageStation, GarbageStationModel>
// {
//   async Convert(
//     source: GarbageStation,
//     getter: (id: string) => Promise<Division>
//   ): Promise<GarbageStationModel> {
//     let model = new GarbageStationModel();
//     model = Object.assign(model, source);
//     if (model.DivisionId) {
//       model.Committees = getter(model.DivisionId);
//       let division = await model.Committees;
//       if (division.ParentId) {
//         model.County = getter(division.ParentId);
//         division = await model.County;
//         if (division.ParentId) {
//           model.City = getter(division.ParentId);
//         }
//       }
//     }
//     return model;
//   }
// }
