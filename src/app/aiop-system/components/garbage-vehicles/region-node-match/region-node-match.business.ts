@Injectable()
export class RegionNodeMatchBusiness {
  constructor(
    private _regionRequest: RegionRequestSerivce,
    private _resourceRequest: ResourceRequestSerivce,
    private _converter: RegionNodeResourceConverter
  ) {}

  async init(searchInfo: RegionNodeMatchSearch) {
    // let { Data: allResources, Page } = await this.listResource();
    // let resourceData = this._converter.iterateToModel(allResources);
    // let res: PagedList<RegionNodeResourceModel> = {
    //   Page: Page,
    //   Data: resourceData,
    // };
    // return res;
  }
  async listResource(searchInfo: RegionNodeMatchSearch) {
    let params: GetCamerasParams = new GetCamerasParams();
    params.Name = searchInfo.Name;
    let { Data: allResources } = await this._resourceRequest.list(params);

    let res = this._converter.iterateToModel(allResources);

    return res;
  }

  addRegionNode(regionNode: RegionNode) {
    return this._regionRequest.node.create(regionNode);
  }
  deleteRegionNode(regionId: string, regionNodeId: string) {
    return this._regionRequest.node.delete(regionId, regionNodeId);
  }
}
