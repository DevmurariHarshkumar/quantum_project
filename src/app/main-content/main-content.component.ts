import { Component, OnInit } from '@angular/core';
import { DragDropService } from '../services/drag-drop.service';
@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit{
  constructor(private dragDropService: DragDropService){}
  ngOnInit(): void {
    this.dragDropService.setisQuestionPage(true)
    console.log("QUESTIONPAGE: ", this.dragDropService.getisQuestionPage())
  }
}
