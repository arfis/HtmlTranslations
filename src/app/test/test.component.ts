import {Component, Input} from '@angular/core';
import {CustomAnchorComponent} from '../custom-anchor/custom-anchor.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  click() {
    console.log('clicked');
  }

  mouseOverSpan() {
    console.log('mouse over span');
  }

  get customAnchorComponent() {
    return CustomAnchorComponent;
  }

  customClick() {
    console.log('custom click');
  }
}
