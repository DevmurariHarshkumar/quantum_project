import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {
  private draggedItemSource = new BehaviorSubject<HTMLElement | null>(null);
  draggedItem$ = this.draggedItemSource.asObservable();
  matrix_box_linker: { [key: string]: string[] } = {};

  // Initialize the boxes array
  private boxxesSource = new BehaviorSubject<any[]>([]);
  boxxes$ = this.boxxesSource.asObservable();

  // Update the boxes array
  updateBoxes(newBoxes: any[]): void {
    this.boxxesSource.next(newBoxes);
    console.log("UPDATED BOXES NOW: ", newBoxes);
    
  }

  addBox(): void {
    const currentBoxes = this.boxxesSource.getValue();
    const newBoxId = `box${currentBoxes.length + 1}`;
    const newBox = { id: newBoxId, label: `Response ${currentBoxes.length + 1}`, isEditing: false };
    const updatedBoxes = [...currentBoxes, newBox];
    this.updateBoxes(updatedBoxes);
  }

  deleteBox(boxId: string): void {
    console.log("inside del box", boxId);
    
    const currentBoxes = this.boxxesSource.getValue();
    const updatedBoxes = currentBoxes.filter(box => box.id !== boxId);
    this.updateBoxes(updatedBoxes);
    this.cleanupDeletedBox(boxId);
  }

  cleanupDeletedBox(deletedBoxId: string): void {
    for (const key in this.matrix_box_linker) {
      const index = this.matrix_box_linker[key].indexOf(deletedBoxId);
      if (index > -1) {
        this.matrix_box_linker[key].splice(index, 1);
      }
    }
  }

  setDraggedItem(item: HTMLElement | null) {
    this.draggedItemSource.next(item);
  }

  initializeDragAndDrop(boxes: HTMLElement[], dropzones: HTMLElement[]): void {
    boxes.forEach(box => {
      box.addEventListener("dragstart", (event: DragEvent) => {
        if (event.target instanceof HTMLElement) {
          this.setDraggedItem(event.target);
          event.dataTransfer?.setData('text/plain', ''); // For some browsers
        }
      });
    });

    dropzones.forEach(dropzone => {
      dropzone.addEventListener("dragover", (event: DragEvent) => {
        event.preventDefault();
      });

      dropzone.addEventListener("drop", (event: DragEvent) => {
        event.preventDefault();
        const draggedItem = this.draggedItemSource.getValue();
        if (draggedItem && event.target instanceof HTMLElement && (event.target.classList.contains('dropzone') || event.target.classList.contains('mat'))) {
          draggedItem.parentNode?.removeChild(draggedItem);
          event.target.appendChild(draggedItem);
          for (const key in this.matrix_box_linker) {
            const index = this.matrix_box_linker[key].indexOf(draggedItem.id);
            if (index > -1) {
              this.matrix_box_linker[key].splice(index, 1);
            }
          }
          if (!this.matrix_box_linker[event.target.id]) {
            this.matrix_box_linker[event.target.id] = [];
          }
          this.matrix_box_linker[event.target.id].push(draggedItem.id);
          this.setDraggedItem(null);
        }
      });
    });
  }
}
