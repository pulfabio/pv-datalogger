import {Component, ViewChild} from '@angular/core';
import {BaThemeConfigProvider, colorHelper, layoutPaths} from '../../../../theme';
import { Router } from '@angular/router';
import * as moment from 'moment';
import 'moment/locale/it';

import {ModalComponent} from '../../../../../shared/components/modal/modal.component';

import { Subscription } from 'rxjs/Subscription';

import {LoadsTabsService} from '../loadsTabs.service';

import 'style-loader!./contacts.scss';

@Component({
  selector: 'contacts',
  templateUrl: './contacts.html'
})
export class Contacts {
  @ViewChild(ModalComponent)

  public modal: ModalComponent;
  private errorMessage: string;
  public contactsList: Array<any>;
  private subscription: Subscription = new Subscription();
  private subscriptionNameSavedWatt: Subscription = new Subscription();
  private subscriptionNameSaved: Subscription = new Subscription();
  private subscriptionGoDigital: Subscription = new Subscription();
  private busy: Subscription = new Subscription();
  public modalTitle: string;
  public MessageSettings: string;
  public contacts_ena: boolean;

  constructor(
    private _loadsTabsService: LoadsTabsService,
    private _baConfig: BaThemeConfigProvider,
    private router: Router
    ) {}

  ngOnInit() {
    moment.locale('it');
    this.getConnection();
    this.getContacts();
  } //Call method at lifecycle hook OnInit.

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionNameSavedWatt.unsubscribe();
    this.subscriptionNameSaved.unsubscribe();
    this.subscriptionGoDigital.unsubscribe();
    this.busy.unsubscribe();
  }

  getConnection() {
    this.busy = this._loadsTabsService.getConnectionContacts().subscribe();
  }

  getContacts = () => {
    this.subscription = this._loadsTabsService.getContacts()
    .subscribe(
      contacts => {
        //let result = this.parseRealTimeData(realTimeData);
        this.contactsList = this.parseContacts(contacts);
      },
      error => this.errorMessage = <any>error
    )
  }

  private parseContacts(data) {
    let modbus = [];
    let contacts = [];

    (<any>Object).entries(data.Result).forEach(([key, value]) => {
    modbus = value;
    });

    (<any>Object).entries(modbus[0]).forEach(([key2, value2]) => {
    contacts.push(value2);
    });

    return contacts;
  }

  public onContactNameClicked = function(id){
    for(let i=0; i < this.contactsList.length; i++){
      if( id == this.contactsList[i].id ){
        this.contactsList[i].edit = true;
      }else{
        this.contactsList[i].edit = false;
      }
    }
  };

  public onContactNameClickedWatt = function (id) {
    for (let i = 0; i < this.contactsList.length; i++) {
      if (id == this.contactsList[i].id) {
        this.contactsList[i].editpower = true;
      } else {
        this.contactsList[i].editpower = false;
      }
    }
  };

  public onContactNameSavedWatt = (id) => {
    for (let i = 0; i < this.contactsList.length; i++) {
      if (id == this.contactsList[i].id) {
        this.contactsList[i].editpower = false;

        this.subscriptionNameSavedWatt = this._loadsTabsService.contactSaved(this.contactsList[i])
        .subscribe(
          data => {
            this.MessageSettings = data.MessageError;
            this.contacts_ena = true;
          },
          error => {
            this.MessageSettings = error;
            this.contacts_ena = false;
          }
        )

        this.modalTitle = "Aggiornamento Potenza Max del Carico";
        this.modal.show();

      }
    }
  };

  public onContactNameSaved = (id) => {
    for (let i = 0; i < this.contactsList.length; i++) {
      if (id == this.contactsList[i].id) {
        this.contactsList[i].editpower = false;

        this.subscriptionNameSaved = this._loadsTabsService.contactSaved(this.contactsList[i])
        .subscribe(
          data => {
            this.MessageSettings = data.MessageError;
            this.contacts_ena = true;
          },
          error => {
            this.MessageSettings = error;
            this.contacts_ena = false;
          }
        )

        this.modalTitle = "Aggiornamento Contatti";
        this.modal.show();

      }
    }
  };

  public onContactGoDigital = (id, checkbox) => {
    let outputpin = {
      outputpinstate: false
    };

    if (checkbox) {
      outputpin = {
        outputpinstate: true
      };
    } else {
      outputpin = {
        outputpinstate: false
      };
    }

    this.subscriptionGoDigital = this._loadsTabsService.goDigital(id, outputpin)
    .subscribe(
      data => {
        this.MessageSettings = data.MessageError;
        this.contacts_ena = true;
      },
      error => {
        this.MessageSettings = error;
        this.contacts_ena = false;
      }
    )

    this.modalTitle = "Impostazione manuale contatto";
    this.modal.show();

  };

}