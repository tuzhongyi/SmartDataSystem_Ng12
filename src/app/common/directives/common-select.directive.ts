import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import { SelectControlValueAccessor } from "@angular/forms";

@Directive({
  selector: 'common-select'
})
export class CommonSelectDirective extends SelectControlValueAccessor implements OnInit {
  @Input()
  set commonValue(value: any) {

  }
  ngOnInit(): void {
    // console.log(this.value)
  }

}