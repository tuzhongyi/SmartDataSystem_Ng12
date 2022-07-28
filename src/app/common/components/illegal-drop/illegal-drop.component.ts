import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

}
interface Hello {
  id: number;
  name: string;
  value: any
}
