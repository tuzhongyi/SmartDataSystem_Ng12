import { Component, OnInit } from '@angular/core';
import { SearchOptionKey } from 'src/app/view-model/search-options.model';
import { Language } from '../../tools/language';
import { SelectItem } from '../select-control/select-control.model';

@Component({
  selector: 'howell-complex-search',
  templateUrl: './complex-search.component.html',
  styleUrls: ['./complex-search.component.less']
})
export class ComplexSearchComponent implements OnInit {

  searchOptions: SelectItem[] = [

  ]
  constructor() {
    this.searchOptions.push(SelectItem.create(SearchOptionKey.name, Language.SearchOption))
    this.searchOptions.push(SelectItem.create(SearchOptionKey.community, Language.SearchOption))
  }

  ngOnInit(): void {
  }

}
