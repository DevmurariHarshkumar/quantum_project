import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragAndDropComponent } from './main-content/drag-and-drop/drag-and-drop.component';
import { ResposeStorageComponent } from './main-content/respose-storage/respose-storage.component';
import { MainContentModule } from './main-content/main-content.module';


@NgModule({
  declarations: [
    AppComponent,
    DragAndDropComponent,
    ResposeStorageComponent
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
