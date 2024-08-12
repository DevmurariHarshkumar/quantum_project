import { Component, AfterViewInit } from '@angular/core';
import { DragDropService } from '../drag-drop.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements AfterViewInit {
  dropzones = [
    { id: 'dropzone1' },
    { id: 'dropzone2' },
    { id: 'dropzone3' }
  ];

  private dragSubscription: Subscription | null = null;

  constructor(private dragDropService: DragDropService) { }

  ngAfterViewInit(): void {
    const dropzones = Array.from(document.querySelectorAll('.dropzone')) as HTMLElement[];

    dropzones.forEach(dropzone => {
      dropzone.addEventListener("dragover", (event: DragEvent) => { 
        console.log("dragover called..")
        event.preventDefault();
      });

      dropzone.addEventListener("drop", (event: DragEvent) => {
        event.preventDefault();
        
        console.log("drop")
        this.dragSubscription?.unsubscribe();
        this.dragSubscription = null;

        this.dragSubscription = this.dragDropService.draggedItem$.subscribe(draggedItem => {
          if (draggedItem && event.target instanceof HTMLElement && event.target.classList.contains('dropzone')) {
            draggedItem.parentNode?.removeChild(draggedItem);
            event.target.appendChild(draggedItem);
            
            console.log("drop above setting in dropevent")
            this.dragDropService.setDraggedItem(null);
            this.dragSubscription?.unsubscribe();
            this.dragSubscription = null;
          }
        });
      });
    });
  }
}
