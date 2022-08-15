import { Component, OnInit } from '@angular/core';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';

@Component({
  selector: 'howell-illegal-drop',
  templateUrl: './illegal-drop.component.html',
  styleUrls: ['./illegal-drop.component.less']
})
export class IllegalDropComponent implements OnInit {

  models: Hello[] = [
    {
      id: 1, name: 'a', value: 'hello',
    }, {
      id: 2, name: 'b', value: 'hi'
    }
  ]
  current = 2;


  // 虹口区: 310109000000
  // 欧阳路街道: 310109009000

  resourceId: string = '310109000000';

  resourceType: UserResourceType = UserResourceType.County;

  resourceDefault: UserResourceType = UserResourceType.Committees;


  constructor() { }

  ngOnInit(): void {
  }

}
interface Hello {
  id: number;
  name: string;
  value: any
}
