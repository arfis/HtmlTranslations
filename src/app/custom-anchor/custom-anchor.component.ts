import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-custom-anchor',
  templateUrl: './custom-anchor.component.html',
  styleUrls: ['./custom-anchor.component.scss']
})
export class CustomAnchorComponent {

  @Output('customClick') onCustomClickEmitter = new EventEmitter();
  @Input('value') value;

  customEvent = new CustomEvent('customClick', { bubbles: true });

  constructor(private element: ElementRef) {}
  onCustomClick($event) {
    this.onCustomClickEmitter.next();
    this.element.nativeElement.dispatchEvent(this.customEvent);
  }

}
