import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClassifyPageComponent } from './classify-page/classify-page.component';
import { MainPropertiesComponent } from './main-properties/main-properties.component';
import { MainContentModule } from './main-content/main-content.module';
import { StandardsAndSkillsComponent } from './main-properties/standards-and-skills/standards-and-skills.component';
import { ClassifyAnswerComponent } from './classify-answer/classify-answer.component';

@NgModule({
  declarations: [
    AppComponent,
    ClassifyPageComponent,
    MainPropertiesComponent,
    StandardsAndSkillsComponent,
    ClassifyAnswerComponent,
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
