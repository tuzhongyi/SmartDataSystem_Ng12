import { Directive, ElementRef, Host, Input, OnInit, Optional, Renderer2 } from "@angular/core";
import { NgSelectOption, SelectControlValueAccessor } from "@angular/forms";
import { CommonSelectDirective } from "./common-select.directive";

@Directive({
  selector: 'common-option'
})
export class CommonOptionDirective extends NgSelectOption implements OnInit {

  constructor(_el: ElementRef, _renderer: Renderer2, @Host() _select: CommonSelectDirective) {
    console.log(_select)
    super(_el, _renderer, _select)
  }
  ngOnInit(): void {

  }
}