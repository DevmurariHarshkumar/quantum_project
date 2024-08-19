import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainContentModule } from './main-content/main-content.module';
import { ClassifyPageComponent } from './classify-page/classify-page.component';
import { MainPropertiesComponent } from './main-properties/main-properties.component';

@NgModule({
  declarations: [
    AppComponent,
    ClassifyPageComponent,
    MainPropertiesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainContentModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
