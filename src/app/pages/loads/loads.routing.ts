import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoadsMain } from './loadsMain.component';
import { Rules } from './loadsTabs/rules/rules.component';
import { Contacts } from './loadsTabs/contacts/contacts.component';
import { NewRule } from './newRule.component';
import { EditRule } from './editRule.component';


// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: LoadsMain,
    children: [
      { path: '', redirectTo: 'rules', pathMatch: 'full' },
      { path: 'rules', component: Rules },
      { path: 'contacts', component: Contacts },
    ]
  },
  {
    path: 'new-rule',
    component: NewRule
  },
  {
    path: 'edit-rule',
    component: EditRule
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
