import { Routes } from '@angular/router';

import { RtlComponent } from '../../pages/rtl/rtl.component';
import { LoginComponent } from 'src/app/pages/login/login.component';


export const AuthLayoutRoutes: Routes = [
    { path: 'rtl',          component: RtlComponent },
     { path: 'login', component: LoginComponent },
];
