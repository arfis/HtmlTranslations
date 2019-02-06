import {Component, Input} from '@angular/core';

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
}
