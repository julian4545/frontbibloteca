import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from "@angular/common/http";

import { RtlComponent } from '../../pages/rtl/rtl.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    HttpClientModule,
        ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    RtlComponent,
     // LoginComponent  // ✅ agrégalo aquí
  ]
})
export class AuthLayoutModule { }
