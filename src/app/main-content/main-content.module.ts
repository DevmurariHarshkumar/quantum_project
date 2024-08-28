import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContentComponent } from './main-content.component';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { ResposeStorageComponent } from './respose-storage/respose-storage.component';
import { MatrixComponent } from './matrix/matrix.component';
import { FormsModule } from '@angular/forms';
import { AddFeedbackComponent } from './add-feedback/add-feedback.component';
import { SelectToolsComponent } from './select-tools/select-tools.component';


@NgModule({
  declarations: [
    MainContentComponent,
    DragAndDropComponent,
    ResposeStorageComponent,
    MatrixComponent,
    AddFeedbackComponent,
    SelectToolsComponent,
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
