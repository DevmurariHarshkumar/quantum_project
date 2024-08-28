import { Component, AfterViewInit, OnInit } from '@angular/core';
import { DragDropService } from '../../services/drag-drop.service';

@Component({
  selector: 'app-respose-storage',
  templateUrl: './respose-storage.component.html',
  styleUrls: ['./respose-storage.component.css']
})
export class ResposeStorageComponent implements OnInit, AfterViewInit {
  boxes: any[] = [];

  constructor(private dragDropService: DragDropService) {}

  ngOnInit(): void {
    // Subscribe to boxxes$ observable from the service
    this.dragDropService.boxxes$.subscribe(updatedBoxes => {
      this.boxes = updatedBoxes;
      this.initializeDragAndDrop();
    });
  }

  ngAfterViewInit(): void {
    // Initial setup for drag-and-drop
    this.initializeDragAndDrop();
  }

  initializeDragAndDrop(): void {
    setTimeout(() => {
      const boxes = Array.from(document.querySelectorAll('.box')) as HTMLElement[];
      this.dragDropService.initializeDragAndDrop(boxes, []);
    }, 0);
  }

  editBox(box: any) {
    box.isEditing = true;
  }

  stopEditing(box: any) {
    box.isEditing = false;
  }

  addBox(): void {
    this.dragDropService.addBox();
  }

  deleteBox(box: any): void {
    this.dragDropService.deleteBox(box.id);
  }
}
