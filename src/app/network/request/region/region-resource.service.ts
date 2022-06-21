
// @Injectable({
//   providedIn: "root",
// })
// export class RegionResourceRequestService {
//   constructor(private requestService: HowellAuthHttpService) { }
//   batch(regionId: string, item: BatchRequest) {
//     return this.requestService.post<BatchRequest, BatchResult>(
//       AIOPRegionsResourcesUrl.batch(regionId),
//       item
//     );
//   }

//   create(regionId: string, resourceId: string) {
//     return this.requestService.post<null, Resource>(
//       AIOPRegionsResourcesUrl.create(regionId, resourceId)
//     );
//   }

//   get(regionId: string, resourceId: string) {
//     return this.requestService.get<Resource>(
//       AIOPRegionsResourcesUrl.get(regionId, resourceId)
//     );
//   }

//   del(regionId: string, resourceId: string) {
//     return this.requestService.delete<Resource>(
//       AIOPRegionsResourcesUrl.del(regionId, resourceId)
//     );
//   }
// }
