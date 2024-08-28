import { Component, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { DragDropService } from '../../services/drag-drop.service';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit, OnChanges, AfterViewInit {
  dropzones = [
    { id: 'dropzone1' },
  ];
  boxes_inside_dropzone: any[] = [];

  constructor(private dragDropService: DragDropService) { }

  ngOnInit(): void {
    console.log("ngoninit drag drop comp");
    console.log("asdfsadfsadfsadf", this.dragDropService.box_till_now)
    this.dragDropService.boxxes$.subscribe(updatedBoxxes => {
      this.boxes_inside_dropzone = updatedBoxxes;
      console.log("updated boxes", updatedBoxxes)
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngonchanges drag drop comp");
  }
  ngAfterViewInit(): void {
    const dropzones = Array.from(document.querySelectorAll('.dropzone')) as HTMLElement[];
    this.dragDropService.initializeDragAndDrop([], dropzones);
    this.dragDropService.boxxes$.subscribe(updatedBoxxes => {
      this.boxes_inside_dropzone = updatedBoxxes;
      console.log("updated boxes", updatedBoxxes)
    })
  }
}
