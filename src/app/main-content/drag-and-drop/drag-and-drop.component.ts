import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DragDropService } from '../../services/drag-drop.service';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit, AfterViewInit {
  dropzones = [
    { id: 'dropzone1' },
  ];
  boxes_inside_dropzone: any[] = [];

  constructor(private dragDropService: DragDropService) { 
    console.log("constructor drag drop const");
    this.dragDropService.boxxes$.subscribe(updatedBoxxes => {
      this.boxes_inside_dropzone = updatedBoxxes;
      console.log("updated boxes", updatedBoxxes)
    })
  }

  ngOnInit(): void {
    console.log("ngoninit drag drop comp");
    console.log("asdfsadfsadfsadf", this.dragDropService.box_till_now)
  }

  ngAfterViewInit(): void {
    const dropzones = Array.from(document.querySelectorAll('.dropzone')) as HTMLElement[];
    this.dragDropService.initializeDragAndDrop([], dropzones);
  }
}
