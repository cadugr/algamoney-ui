import { LoginFormComponent } from './login-form/login-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequestOptions, Http } from '@angular/http';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { SharedModule } from 'app/shared/shared.module';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { AuthHttp, AuthConfig } from 'angular2-jwt';


export function authHttpServiceFactory (http: Http, options: RequestOptions) {
  const config = new AuthConfig({
    globalHeaders: [
      { 'Content-Type': 'application/json'}
    ]
  })
  return new AuthHttp(config, http, options);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SegurancaRoutingModule,
    SharedModule,
    InputTextModule,
    ButtonModule
  ],
  declarations: [LoginFormComponent],
  exports: [],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ]
})
export class SegurancaModule { }
