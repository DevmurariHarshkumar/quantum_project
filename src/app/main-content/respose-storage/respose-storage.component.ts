import { Component, AfterViewInit } from '@angular/core';
import { DragDropService } from '../../drag-drop.service';

@Component({
  selector: 'app-respose-storage',
  templateUrl: './respose-storage.component.html',
  styleUrls: ['./respose-storage.component.css']
})
export class ResposeStorageComponent implements AfterViewInit {
  boxes = Array.from({ length: 1 }, (_, i) => ({ id: `box${i + 1}`, label: `Response ${i + 1}`, isEditing: false }));
  box_till_now = 1;

  constructor(private dragDropService: DragDropService) {}

  ngAfterViewInit(): void {
    const boxes = Array.from(document.querySelectorAll('.box')) as HTMLElement[];
    this.dragDropService.initializeDragAndDrop(boxes, []);
    this.dragDropService.updateBoxes(this.boxes);
  }

  editBox(box: any) {
    box.isEditing = true;
  }

  stopEditing(box: any) {
    box.isEditing = false;
  }

  addBox(): void {
    this.box_till_now+=1;
    const newBoxId = `box${this.box_till_now}`;
    this.boxes.push({ id: newBoxId, label: `Response ${this.box_till_now}`, isEditing: false });
    setTimeout(() => {
      this.initializeDragAndDropboxes();
    }, 0);
    this.dragDropService.updateBoxes(this.boxes); // for changes in drag and drop 
  }

  initializeDragAndDropboxes(): void {
    const boxes = Array.from(document.querySelectorAll('.box')) as HTMLElement[];
    this.dragDropService.initializeDragAndDrop(boxes, []);
  }

  deleteBox(box: any): void {
    this.boxes = this.boxes.filter(b => b.id !== box.id);
    this.dragDropService.cleanupDeletedBox(box.id);
    const boxes = Array.from(document.querySelectorAll('.box')) as HTMLElement[];
    this.dragDropService.initializeDragAndDrop(boxes, []);
    this.dragDropService.updateBoxes(this.boxes);
  }
}
