import { Component } from '@angular/core';
import { DragDropService } from '../../drag-drop.service';

@Component({
  selector: 'app-respose-storage',
  templateUrl: './respose-storage.component.html',
  styleUrls: ['./respose-storage.component.css']
})
export class ResposeStorageComponent {

  boxes = Array.from({ length: 10 }, (_, i) => ({ id: `box${i + 1}`, label: `Response ${i + 1}` }));

  constructor(private dragDropService: DragDropService){}

  ngAfterViewInit(): void {
    this.initializeDragAndDropboxes();
  }

  initializeDragAndDropboxes(): void{
    const boxes = Array.from(document.querySelectorAll('.box')) as HTMLElement[];
  
    boxes.forEach(box => {
      box.addEventListener("dragstart", (event: DragEvent) => {
        console.log("drag start, event.target: ", event.target)
        if (event.target instanceof HTMLElement) {
          console.log("drag start ka event.target: ", event.target)
          this.dragDropService.setDraggedItem(event.target);
          event.dataTransfer?.setData('text/plain', '');
        }
      });
    });
  }
}
