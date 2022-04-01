import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HorizontalAlign } from 'src/app/enum/direction.enum';
import { SelectEnum } from 'src/app/enum/select.enum';
import { TreeServiceEnum } from 'src/app/enum/tree-service.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { FlatTreeNode } from 'src/app/view-model/flat-tree-node.model';

@Component({
  selector: 'howell-division-station-tree-mult-filter',
  templateUrl: './division-station-tree-mult-filter.component.html',
  styleUrls: ['./division-station-tree-mult-filter.component.less']
})
export class DivisionStationTreeMultFilterComponent implements OnInit {

  
  constructor() { }
  HorizontalAlign = HorizontalAlign;
  align:HorizontalAlign = HorizontalAlign.left;
  expand = true;
  userType = UserResourceType.County;
  treeServiceProvider:TreeServiceEnum = TreeServiceEnum.Division;
  treeSelectModel:SelectEnum=SelectEnum.Multiple

  fruits: string[] = [];


  ngOnInit(): void {
    
  }


  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }


  selectTree(nodes: FlatTreeNode[]) {
    this.fruits = [];
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      this.fruits.push(node.name);
      // this.current = node;
      // this.select.emit(node.data);
    }
  }
}
