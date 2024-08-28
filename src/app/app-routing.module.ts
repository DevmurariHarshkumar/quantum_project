import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassifyPageComponent } from './classify-page/classify-page.component';
import { ClassifyAnswerComponent } from './classify-answer/classify-answer.component';

const routes: Routes = [
  {
    path:"",
    component:ClassifyPageComponent
  },
  {
    path: "classify_question",
    component: ClassifyPageComponent
  },
  {
    path: "classify_answer",
    component: ClassifyAnswerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
