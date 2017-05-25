import {Component, Input} from '@angular/core';

@Component({
  selector: 'counter',
  template: `
    <div class="input-group-addon plus-minus-addon">
      <span class="plusMinusBtn minusBtn" (click)="decrement()"><i class="fa fa-minus"></i></span>
      <span class="plusMinusBtn plusBtn" (click)="increment()"><i class="fa fa-plus"></i></span>
    </div>
  `
})
export class CounterComponent {
  @Input() count: number;
  constructor() {

  }
  increment() {
    this.count += 10;
  }
  decrement() {
    if (this.count - 10 >= 0) {
      this.count -= 10;
    }
  }
}