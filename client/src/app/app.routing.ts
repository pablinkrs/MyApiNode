import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserMant } from './components/user.mant';

const appRoutes: Routes = [
  {path: '',component: UserMant},
  {path: 'mis-datos',component: UserMant},
  {path: '*',component: UserMant}
];

export const appRoutingProvider: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
