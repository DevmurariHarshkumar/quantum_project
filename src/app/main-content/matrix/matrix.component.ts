import { AfterViewChecked, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DragDropService } from 'src/app/services/drag-drop.service';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnChanges, AfterViewChecked {
 

  constructor(private dragDropService: DragDropService) { }
  isFirstRowChecked = false;
  isFirstColumnChecked = false;
  matrix_elements: any[][] = []

  ngOnInit(changes: SimpleChanges): void {
    console.log("oninit mat component")
    this.dragDropService.frc$.subscribe(new_val => {
      this.isFirstRowChecked = new_val;
    });
    this.dragDropService.fcc$.subscribe(new_val => {
      this.isFirstColumnChecked = new_val;
    });
    this.dragDropService.me$.subscribe(new_val => {
      this.matrix_elements = new_val;
    });
  }

  ngOnChanges() {
    console.log("oncahnges mat component")
  }
  
  ngAfterViewInit(): void {
    const matrix_elements = Array.from(document.querySelectorAll('.mat')) as HTMLElement[];
    console.log("mat elements ", matrix_elements)
    console.log("after view init")
    this.dragDropService.initializeDragAndDrop([], matrix_elements);
  }
  
  
  ngAfterViewChecked(): void {
    if (this.dragDropService.shouldInitializeDragDrop) {
      this.dragDropService.shouldInitializeDragDrop = false;
      const matrix_elements = Array.from(document.querySelectorAll('.mat')) as HTMLElement[];
      // console.log("HTML RETRIEVED", matrix_elements);
      console.log("after view checked")
      this.dragDropService.initializeDragAndDrop([], matrix_elements);
    }
  }

  
  add_row(){
    this.dragDropService.add_row()
  }
  add_column(){
    this.dragDropService.add_column()
  }
  del_row(){
    this.dragDropService.del_row()
  }
  del_column(){
    this.dragDropService.del_column()
  }


}
