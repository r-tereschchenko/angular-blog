import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import localeRU from '@angular/common/locales/ru';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './home-page/home-page.component';
import {PostPageComponent} from './post-page/post-page.component';
import {PostComponent} from './shared/components/post/post.component';
import {SharedModule} from './shared/shared.module';
import {AuthInterceptor} from './shared/interceptors/auth.interceptor';
import { AnimationComponent } from './animation/animation.component';

registerLocaleData(localeRU, 'ru');

// Регистрируем интерсептор AuthInterceptor
const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent,
    AnimationComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule {
}
