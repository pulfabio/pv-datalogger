import {Component} from '@angular/core';

import {GlobalState} from '../../../global.state';

@Component({
  selector: 'ba-content-top',
  styleUrls: ['./baContentTop.scss'],
  templateUrl: './baContentTop.html',
})
export class BaContentTop {

  public activePageTitle:string = '';

  // constructor(private _state:GlobalState) {
  //   this._state.subscribe('menu.activeLink', (activeLink) => {
  //     if (activeLink.hasOwnProperty("title")) {
  //       this.activePageTitle = activeLink.title;
  //     } else {this.activePageTitle = "Dashboard";}
  //   });
  // }

  //ORIGINAL CONSTRUCTOR
  constructor(private _state:GlobalState) {
    this._state.subscribe('menu.activeLink', (activeLink) => {
      if (activeLink) {
        this.activePageTitle = activeLink.title;
      }
    });
  }
}
