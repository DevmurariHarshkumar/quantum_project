import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-classify-page',
  templateUrl: './classify-page.component.html',
  styleUrls: ['./classify-page.component.css']
})
export class ClassifyPageComponent {
  constructor(){}

  activeComponent: string = 'question_properties';

  showComponent(component: string) {
    this.activeComponent = component;
  }
}
