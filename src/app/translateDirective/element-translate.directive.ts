import {
  AfterViewChecked,
  ComponentFactory,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Input, NgZone,
  OnDestroy,
  OnInit,
  Renderer2, ViewContainerRef
} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {CustomAnchorComponent} from '../custom-anchor/custom-anchor.component';

@Directive({
  selector: '[appElementTranslate]'
})
export class ElementTranslateDirective implements AfterViewChecked, OnInit, OnDestroy {

  @Input('elementTranslateSettings') elementTranslateSettings: TranslateSelectorModel[];

  wasEventAdded;
  translateSubscription;

  constructor(private element: ElementRef,
              private renderer: Renderer2,
              private resolver: ComponentFactoryResolver,
              private translateService: TranslateService,
              private container: ViewContainerRef) {
  }


  ngOnInit(): void {
    this.translateSubscription = this.translateService.onLangChange.subscribe(
      () => {
        this.wasEventAdded = false;
      }
    );
  }

  ngAfterViewChecked() {
    if (!this.wasEventAdded) {
      this.setupTranslationElements();
    }
  }

  createComponent(component, value) {
    const factory = this.resolver.resolveComponentFactory(component);
    const created = this.container.createComponent(factory);
    created.location.nativeElement.value = value;
    return created;
  }

  parseString(value: string, event, method) {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(value, 'text/html');
    const allnodes = parsedHtml.getElementsByTagName('*');
    const foundComponents = [];

    for (let i = allnodes.length - 1; i > 2; i--) {
      foundComponents.push(allnodes.item(i));
      console.log(foundComponents);
    }
    return foundComponents;
  }

  setupTranslationElements() {

    for (const elementTranslateSetting of this.elementTranslateSettings) {
      const {customComponentString} = elementTranslateSetting;

      if (customComponentString) {
        this.setupCustomComponents(elementTranslateSetting);
      } else {
        this.setupOrdinaryComponents(elementTranslateSetting);
      }
    }
  }

  setupOrdinaryComponents(elementTranslateSetting) {

    const {selector, method, event} = elementTranslateSetting;
    const elementFoundBySelector = this.element.nativeElement.querySelector(selector);
    if (elementFoundBySelector) {
      this.addListener(elementFoundBySelector, event, method);
      this.wasEventAdded = true;
    }
  }

  setupCustomComponents(elementTranslateSetting) {
    const {method, event, customComponentString, componentType} = elementTranslateSetting;
    const translatedString = this.translateService.instant(customComponentString);
    const foundComponents = this.parseString(translatedString, event, method);

    this.container.clear();
    for (const component of foundComponents) {
      const componentInstance = this.createComponent(componentType, component.innerText);
      const componentRef = componentInstance.location.nativeElement;
      this.addListener(componentRef, event, method);
    }
  }

  addListener(element, event, method) {
    this.renderer.listen(element, event, method);
    this.wasEventAdded = true;
  }

  ngOnDestroy(): void {
    this.translateSubscription.unsubscribe();
  }
}
