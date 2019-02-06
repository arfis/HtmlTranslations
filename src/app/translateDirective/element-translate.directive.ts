import {AfterViewChecked, Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appElementTranslate]'
})
export class ElementTranslateDirective implements AfterViewChecked{

  @Input('key') key;
  @Input('selector') selector;
  @Input('method') method;
  @Input('event') event;

  wasEventAdded = false;

  constructor(private element: ElementRef) { }

  ngAfterViewChecked() {
    const anchor = this.element.nativeElement.querySelector(this.selector);
    if (anchor && !this.wasEventAdded) {
      this.wasEventAdded = true;
      anchor.addEventListener(this.event, this.method);
    }
  }
}
