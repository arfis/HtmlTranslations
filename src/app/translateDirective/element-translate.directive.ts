import {AfterViewChecked, Directive, ElementRef, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Directive({
  selector: '[appElementTranslate]'
})
export class ElementTranslateDirective implements AfterViewChecked, OnInit {

  @Input('selector') selector;
  @Input('method') method;
  @Input('event') event;

  wasEventAdded = false;

  constructor(private element: ElementRef,
              private translateService: TranslateService) {
  }


  ngOnInit(): void {
    this.translateService.onLangChange.subscribe(
      () => this.wasEventAdded = false
    );
  }

  ngAfterViewChecked() {
    if (!this.wasEventAdded) {
      this.setupListeners();
    }
  }

  setupListeners() {
    const elementFoundBySelector = this.element.nativeElement.querySelector(this.selector);
    if (elementFoundBySelector) {
      this.wasEventAdded = true;
      elementFoundBySelector.addEventListener(this.event, this.method);
    }
  }
}
