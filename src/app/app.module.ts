import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ElementTranslateDirective } from './translateDirective/element-translate.directive';
import { TestComponent } from './test/test.component';
import { CustomAnchorComponent } from './custom-anchor/custom-anchor.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ElementTranslateDirective,
    TestComponent,
    CustomAnchorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CustomAnchorComponent
  ]
})
export class AppModule { }
