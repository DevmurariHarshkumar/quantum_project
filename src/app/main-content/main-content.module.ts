import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContentComponent } from './main-content.component';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { ResposeStorageComponent } from './respose-storage/respose-storage.component';
import { MatrixComponent } from './matrix/matrix.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainContentComponent,
    DragAndDropComponent,
    ResposeStorageComponent,
    MatrixComponent,
  ],
  imports: [
    CommonModule, 
    FormsModule
  ],
  exports: [
    MainContentComponent
  ]
})
export class MainContentModule { }
