import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { ApiBaseInterceptor } from './interceptors/api-base.interceptor';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiBaseInterceptor,
      multi: true, // Indica que este interceptor puede ser multi-proveedor
    },
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
