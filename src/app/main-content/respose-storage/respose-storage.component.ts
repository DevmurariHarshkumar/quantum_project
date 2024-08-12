import { Component } from '@angular/core';
import { DragDropService } from '../../drag-drop.service';

@Component({
  selector: 'app-respose-storage',
  templateUrl: './respose-storage.component.html',
  styleUrls: ['./respose-storage.component.css']
})
export class ResposeStorageComponent {

  boxes = Array.from({ length: 10 }, (_, i) => ({ id: `box${i + 1}`, label: `Response ${i + 1}` , isEditing:false}));

  constructor(private dragDropService: DragDropService){}

  ngAfterViewInit(): void {
    this.initializeDragAndDropboxes();
  }

  editBox(box: any) {
    box.isEditing = true;
    // console.log(box);
    // var x = document.getElementById(box.id)
    // console.log("adfsadsf", x)
    // if (x instanceof HTMLElement){
    //   x.style.color = "black";
    //   x.style.backgroundColor = "red";
    //   x.focus()
    // }
  }

  stopEditing(box: any) {
    box.isEditing = false;
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
