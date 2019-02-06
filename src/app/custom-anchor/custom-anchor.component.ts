import {Component, ElementRef, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-custom-anchor',
  templateUrl: './custom-anchor.component.html',
  styleUrls: ['./custom-anchor.component.scss']
})
export class CustomAnchorComponent {

  @Output('customClick') onCustomClickEmitter = new EventEmitter();

  customEvent = new CustomEvent('customClick', {bubbles: true});

  constructor(private element: ElementRef) {
  }


  onCustomClick($event) {
    this.onCustomClickEmitter.next();
    // workaround so the renderer invokes when the action is called
    this.element.nativeElement.dispatchEvent(this.customEvent);
  }

}
