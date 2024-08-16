import { Component, AfterViewInit } from '@angular/core';
import { DragDropService } from '../../drag-drop.service';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements AfterViewInit {
  dropzones = [
    { id: 'dropzone1' },
  ];

  constructor(private dragDropService: DragDropService) { }

  ngAfterViewInit(): void {
    const dropzones = Array.from(document.querySelectorAll('.dropzone')) as HTMLElement[];
    this.dragDropService.initializeDragAndDrop([], dropzones);
  }
}
