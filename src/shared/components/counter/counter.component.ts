import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'counter',
  template: `
    <button class="plusminus col-xs-6" type="button" (click)="decrement()"><i class="fa fa-minus"></i></button>
    <button class="plusminus col-xs-6" type="button" (click)="increment()"><i class="fa fa-plus"></i></button>
  `
})
  // <span class="plusMinusBtn minusBtn" (click)="decrement()"><i class="fa fa-minus"></i></span>
  // <span class="plusMinusBtn plusBtn" (click)="increment()"><i class="fa fa-plus"></i></span>
export class CounterComponent {
  @Input() count: string;
  @Output() countChanged = new EventEmitter<string>();
  constructor() {

  }
  public increment() {
    let value = +this.count;
    this.count =  String(value += 10);
    this.countChanged.emit(this.count);
  }
  public decrement() {
    let value = +this.count;
    if (value - 10 >= 0) {
      this.count = String(value -= 10);
    }
    this.countChanged.emit(this.count);
  }
  // public increment() {
  //   this.count += 10;
  // }
  // public decrement() {
  //   if (this.count - 10 >= 0) {
  //     this.count -= 10;
  //   }
  // }
}