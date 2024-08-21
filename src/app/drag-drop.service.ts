import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {
  private draggedItemSource = new BehaviorSubject<HTMLElement | null>(null);
  draggedItem$ = this.draggedItemSource.asObservable();
  matrix_box_linker: { [key: string]: string[] } = {};




  private boxxesSource = new BehaviorSubject<any[]>([]);
  
  // Observable that components can subscribe to
  boxxes$ = this.boxxesSource.asObservable();

  // Method to update the boxxes array
  updateBoxes(newBoxes: any[]): void {
    this.boxxesSource.next(newBoxes); // Push the updated array to the BehaviorSubject
  }





  setDraggedItem(item: HTMLElement | null) {
    this.draggedItemSource.next(item);
  }

  // removing afte delte is pressed, removes from mat-box-linker
  cleanupDeletedBox(deletedBoxId: string): void {
    for (const key in this.matrix_box_linker) {
      const index = this.matrix_box_linker[key].indexOf(deletedBoxId);
      if (index > -1) {
        this.matrix_box_linker[key].splice(index, 1);
      }
    }
  }

  initializeDragAndDrop(boxes: HTMLElement[], dropzones: HTMLElement[]): void {
    console.log("initializing drag and drop on boxes", boxes)
    boxes.forEach(box => {
      box.addEventListener("dragstart", (event: DragEvent) => {
        console.log("inside dragstart")
        if (event.target instanceof HTMLElement) {
          this.setDraggedItem(event.target);
          event.dataTransfer?.setData('text/plain', ''); // For some browsers
        }
      });
    });

    dropzones.forEach(dropzone => {
      dropzone.addEventListener("dragover", (event: DragEvent) => {
        console.log("inside dragover")
        event.preventDefault();
      });

      dropzone.addEventListener("drop", (event: DragEvent) => {
        event.preventDefault();
        const draggedItem = this.draggedItemSource.getValue()
        console.log("inside drop")
        if (draggedItem && event.target instanceof HTMLElement && (event.target.classList.contains('dropzone') || event.target.classList.contains('mat'))) {
          draggedItem.parentNode?.removeChild(draggedItem);
          event.target.appendChild(draggedItem);
          console.log("parent------  ", draggedItem.parentNode)
          console.log("event.target------- ", event.target.id)
          for (const key in this.matrix_box_linker) {
            const index = this.matrix_box_linker[key].indexOf(draggedItem.id);
            if (index > -1) {
              this.matrix_box_linker[key].splice(index, 1);
            }
          }
          console.log("draggedItem.id------- ",this.matrix_box_linker[event.target.id])
          if (!this.matrix_box_linker[event.target.id]) {
            this.matrix_box_linker[event.target.id] = [];
          }
          this.matrix_box_linker[event.target.id].push(draggedItem.id);
          this.setDraggedItem(null);
        }
        console.log("UPDATED MATRIX_BOX_LINKER....", this.matrix_box_linker)
      });
    });
  }
}