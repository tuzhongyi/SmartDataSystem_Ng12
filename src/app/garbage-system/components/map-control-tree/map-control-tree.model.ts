import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource } from '@angular/material/tree';
export class MapControlTreeArgs {
  name?: string;

  isnormal: boolean = true;
  isdrop: boolean = true;
  isfull: boolean = true;
  iserror: boolean = true;

  isgarbage: boolean = true;
  isrfid: boolean = true;
  isconstruction: boolean = true;
  juststation = false;
  refresh = false;
}

export class MapControlTreeNode<T = any> {
  constructor(id: string, text: string, data: T) {
    this.id = id;
    this.text = text;
    this.data = data;
  }
  id: string;
  text: string;
  data: T;
  children?: MapControlTreeNode<T>[];
  icon?: string;
  icontitle: string = '';
  level = 0;
  buttons: MapControlTreeNodeButton<T>[] = [];
  parentId?: string;
  extendable = false;
}

export class MapControlTreeNodeButton<T = any> {
  constructor(data: T, type: MapControlButtonType) {
    this.data = data;
    this.type = type;
  }
  data: T;

  class?: string;
  icon?: string;
  text?: string;
  title: string = '';
  type: MapControlButtonType;
}

export class MapControlTreeModel<T> {
  constructor(
    control: FlatTreeControl<T>,
    source: MatTreeFlatDataSource<T, T>
  ) {
    this.control = control;
    this.source = source;
  }

  trackBy = (index: number, node: T) => node; //必须返回node
  control: FlatTreeControl<T>;
  source: MatTreeFlatDataSource<T, T>;
}

export enum MapControlButtonType {
  info,
  drop,
  alarm,
}
