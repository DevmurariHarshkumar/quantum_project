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

  private shouldInitializeDragDrop = false;

  ngAfterViewChecked(): void {
    if (this.shouldInitializeDragDrop) {
      this.shouldInitializeDragDrop = false;
      const matrix_elements = Array.from(document.querySelectorAll('.mat')) as HTMLElement[];
      console.log("HTML RETRIEVED", matrix_elements);
      this.dragDropService.initializeDragAndDrop([], matrix_elements);
    }
  }

  add_row() {
    const no_of_rows = this.matrix_elements.length;
    const no_of_columns = this.matrix_elements[0].length;

    console.log(no_of_rows, no_of_columns);
    const row = [];
    for (let i = 1; i <= no_of_columns; i++) {
      const newMatId = `mat${no_of_rows+1}${i}`;
      row.push({id: newMatId});
    }
    console.log(row);
    console.log(this.matrix_elements);
    this.matrix_elements.push(row);
    this.shouldInitializeDragDrop = true;
  }

  add_column() {
    const no_of_rows = this.matrix_elements.length;
    const no_of_columns = this.matrix_elements[0].length + 1; // New column index
  
    for (let rowIndex = 0; rowIndex < no_of_rows; rowIndex++) {
      const newMatId = `mat${rowIndex + 1}${no_of_columns}`;
      this.matrix_elements[rowIndex].push({ id: newMatId });
    }
  
    console.log("Updated matrix_elements:", this.matrix_elements);
    this.shouldInitializeDragDrop = true;
  }


  del_row() {
    this.matrix_elements = this.matrix_elements.slice(0, -1);
  }

  del_column() {
    const no_of_rows = this.matrix_elements.length;
    const no_of_columns = this.matrix_elements[0].length + 1; // New column index
  
    for (let rowIndex = 0; rowIndex < no_of_rows; rowIndex++) {
      // const newMatId = `mat${rowIndex + 1}${no_of_columns}`;
      this.matrix_elements[rowIndex] = this.matrix_elements[rowIndex].slice(0, -1)
    }
  
    // console.log("Updated matrix_elements:", this.matrix_elements);
    // this.shouldInitializeDragDrop = true;
  }
}

  // ngAfterViewInit(): void {
  //   const matrix_elements = Array.from(document.querySelectorAll('.mat')) as HTMLElement[];
  //   console.log("mat elements ", matrix_elements)
  //   this.dragDropService.initializeDragAndDrop([], matrix_elements);
  // }

  // add_row(){
  //   var no_of_rows = this.matrix_elements.length
  //   var no_of_columns = this.matrix_elements[0].length

  //   console.log(no_of_rows, no_of_columns)
  //   const row = [];
  //   for(var i  = 1; i <= no_of_columns; i++){
  //     const newMatId = `mat${no_of_rows+1}${i}`;
  //     row.push({id: newMatId})
  //   }
  //   console.log(row)
  //   console.log(this.matrix_elements)
  //   this.matrix_elements.push(row)
  //   const matrix_elements = Array.from(document.querySelectorAll('.mat')) as HTMLElement[];
  //   console.log("HTML RETRIEVED", matrix_elements)
  //   setTimeout(() => {
  //     this.dragDropService.initializeDragAndDrop([], matrix_elements);
  //   }, 0);
  // }

  // add_column(){
  //   var no_of_rows = this.matrix_elements.length
  //   var no_of_columns = this.matrix_elements[0].length

  //   console.log(no_of_rows, no_of_columns)
  // }
// }
