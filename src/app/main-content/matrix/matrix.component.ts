import { Component } from '@angular/core';
import { DragDropService } from 'src/app/drag-drop.service';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent {

  matrix_elements: any[][] = [
    [{id:'mat11'}, {id:'mat12'}],
    [{id:'mat21'}, {id:'mat22'}],
  ];

  constructor(private dragDropService: DragDropService) {}

  ngAfterViewInit(): void {
    const matrix_elements = Array.from(document.querySelectorAll('.mat')) as HTMLElement[];
    console.log("mat elements ", matrix_elements)
    this.dragDropService.initializeDragAndDrop([], matrix_elements);
  }
}
