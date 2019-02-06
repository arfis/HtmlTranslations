import {AfterViewChecked, Directive, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Directive({
  selector: '[appElementTranslate]'
})
export class ElementTranslateDirective implements AfterViewChecked, OnInit, OnDestroy {

  @Input('elementTranslateSettings') elementTranslateSettings: TranslateSelectorModel[];

  wasEventAdded = false;
  translateSubscription;

  constructor(private element: ElementRef,
              private translateService: TranslateService) {
  }


  ngOnInit(): void {
    this.translateSubscription = this.translateService.onLangChange.subscribe(
      () => this.wasEventAdded = false
    );
  }

  ngAfterViewChecked() {
    if (!this.wasEventAdded) {
      this.setupListeners();
    }
  }

  setupListeners() {
    for (const elementTranslateSetting of this.elementTranslateSettings) {
      const {selector, method, event} = elementTranslateSetting;
      const elementFoundBySelector = this.element.nativeElement.querySelector(selector);
      if (elementFoundBySelector) {
        this.wasEventAdded = true;
        elementFoundBySelector.addEventListener(event, method);
      }
    }
  }

  ngOnDestroy(): void {
    this.translateSubscription.unsubscribe();
  }
}
