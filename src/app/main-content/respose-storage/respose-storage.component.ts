import { Component, AfterViewInit, OnChanges, OnInit } from '@angular/core';
import { DragDropService } from '../../services/drag-drop.service';

@Component({
  selector: 'app-respose-storage',
  templateUrl: './respose-storage.component.html',
  styleUrls: ['./respose-storage.component.css']
})
export class ResposeStorageComponent implements OnInit, OnChanges, AfterViewInit {
  boxes: any[] = []
  box_till_now = 1;

  constructor(private dragDropService: DragDropService) {  }

  ngOnInit(): void {
    this.boxes = Array.from({ length: 5 }, (_, i) => ({ id: `box${i + 1}`, label: `Response ${i + 1}`, isEditing: false }));
    this.addBox(); // for testing, remove after csss done
  }

  ngOnChanges() {
    console.log("ng on change in respose str")
  }

  ngAfterViewInit(): void {
    this.dragDropService.boxxes$.subscribe(updatedBoxxes => {
      this.boxes = updatedBoxxes;
    })
    const boxes = Array.from(document.querySelectorAll('.box')) as HTMLElement[];
    console.log("after view init called.....................", boxes)
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
    console.log("inside add box this..boxes", this.boxes)
    this.boxes.push({ id: newBoxId, label: `Response ${this.box_till_now}`, isEditing: false });
    setTimeout(() => {
      const boxes = Array.from(document.querySelectorAll('.box')) as HTMLElement[];
      this.dragDropService.initializeDragAndDrop(boxes, []);
    }, 0);
    this.dragDropService.updateBoxes(this.boxes); // for changes in drag and drop
  }

  deleteBox(box: any): void {
    this.boxes = this.boxes.filter(b => b.id !== box.id);
    this.dragDropService.cleanupDeletedBox(box.id);
    const boxes = Array.from(document.querySelectorAll('.box')) as HTMLElement[];
    this.dragDropService.initializeDragAndDrop(boxes, []);
    this.dragDropService.updateBoxes(this.boxes);
  }
}
