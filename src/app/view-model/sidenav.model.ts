export class SidenavModel {
  title: string = '';
  id: string = '';
  path: string = '';
  children?: Array<SidenavModel> = [];
}
