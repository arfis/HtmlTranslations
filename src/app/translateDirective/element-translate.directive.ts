import {
  AfterViewChecked,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2, ViewContainerRef
} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

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

  parseHtmlString(translation: string) {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(translation, 'text/html');
    const allnodes = parsedHtml.getElementsByTagName('*');
    const foundComponents = [];

    // 2 is because the DOMParser creates also the body and Html tag
    // needs improvement
    for (let i = allnodes.length - 1; i > 2; i--) {
      foundComponents.push(allnodes.item(i));
    }
    return foundComponents;
  }

  setupTranslationElements() {
    // setting up translations and listeners for the html elements from the translation file
    for (const elementTranslateSetting of this.elementTranslateSettings) {
      const {customComponentString} = elementTranslateSetting;

      // for now it renders either custom components, or ordinary html components
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
    // custom components are not working so properly, at the moment they
    // are just being rendered without taking iny other info from the translation
    const {method, event, customComponentString, componentType} = elementTranslateSetting;
    const translatedString = this.translateService.instant(customComponentString);
    const foundComponents = this.parseHtmlString(translatedString, event, method);

    this.container.clear();
    for (const component of foundComponents) {
      // the part where are the components created
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
