import { Component } from '@angular/core';

@Component({
  selector: 'app-classify-page',
  templateUrl: './classify-page.component.html',
  styleUrls: ['./classify-page.component.css']
})
export class ClassifyPageComponent {
  constructor(){}

  activeComponent: string = 'question_content';

  showComponent(component: string) {
    this.activeComponent = component;
  }
}
