import { ElementTranslateDirective } from './element-translate.directive';
import {TestBed} from '@angular/core/testing';
import {ElementRef} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

describe('ElementTranslateDirective', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ ElementRef, TranslateService ]
  }));
  it('should create an instance', () => {
    const directive = new ElementTranslateDirective(ElementRef, TranslateService);
    expect(directive).toBeTruthy();
  });
});
