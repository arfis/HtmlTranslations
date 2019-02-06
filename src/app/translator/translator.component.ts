import {AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.scss']
})
export class TranslatorComponent implements OnChanges, OnInit, AfterViewChecked, AfterViewInit {

  @Input('key') key;
  @Input('params') params;
  @Input('event') event;

  wasEventAdded = false;

  constructor(private element: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const anchor = this.element.nativeElement.querySelector('.red');
    console.log('changes', {...anchor});
  }

  ngAfterViewInit(): void {
    const anchor = this.element.nativeElement.querySelector('.red');
    console.log('after view init', {...anchor});
  }

  ngAfterViewChecked() {
    const anchor = this.element.nativeElement.querySelector('.red');
    if (anchor && !this.wasEventAdded) {
      this.wasEventAdded = true;
      anchor.addEventListener(this.event, this.params.method);
    }
  }

  ngOnInit() {
  }

}
