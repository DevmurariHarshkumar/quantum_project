import { AfterViewChecked, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DragDropService } from 'src/app/services/drag-drop.service';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnChanges, AfterViewChecked {

  matrix_elements: any[][] = [
    [{ id: 'mat11' }, { id: 'mat12' }],
    [{ id: 'mat21' }, { id: 'mat22' }],
  ];

  constructor(private dragDropService: DragDropService) { }

  ngOnInit(changes: SimpleChanges): void {
    console.log("oninit mat component")
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

  private shouldInitializeDragDrop = false;

  ngAfterViewChecked(): void {
    if (this.shouldInitializeDragDrop) {
      this.shouldInitializeDragDrop = false;
      const matrix_elements = Array.from(document.querySelectorAll('.mat')) as HTMLElement[];
      // console.log("HTML RETRIEVED", matrix_elements);
      console.log("after view checked")
      this.dragDropService.initializeDragAndDrop([], matrix_elements);
    }
  }

  add_row() {
    const no_of_rows = this.matrix_elements.length;
    const no_of_columns = this.matrix_elements[0].length;
    const row = [];
    for (let i = 1; i <= no_of_columns; i++) {
      const newMatId = `mat${no_of_rows + 1}${i}`;
      row.push({ id: newMatId });
    }
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
    this.shouldInitializeDragDrop = true;
  }


  del_row() {
    const deleted_row = this.matrix_elements.pop();
    // for cell of deleted row
    for (let i = 0; i < deleted_row!.length; i++) {
      if (deleted_row && deleted_row.length > 0) {
        console.log("mat of row", deleted_row[i].id);
        console.log("mat box link", this.dragDropService.matrix_box_linker);
        // boxes of that cell
        let boxes = this.dragDropService.matrix_box_linker[deleted_row[i].id]
        if (boxes) {
          // boxes of that cell
          while (boxes.length) {
            console.log("boxes ", boxes)
            console.log("box given to delete", boxes[0])
            this.dragDropService.deleteBox(boxes[0])
            console.log("one box deleted")
          }
        }
        // }
        delete this.dragDropService.matrix_box_linker[deleted_row![i].id];
      }
    }
    console.log("after", this.matrix_elements, this.dragDropService.matrix_box_linker)
    this.shouldInitializeDragDrop = true;
    console.log("mat box linker", this.dragDropService.matrix_box_linker)
  }

  del_column() {
    let deleted_col = [];
    for (let rowIndex = 0; rowIndex < this.matrix_elements.length; rowIndex++) {
      deleted_col.push(this.matrix_elements[rowIndex].pop());
    }
    console.log("deleted_col", deleted_col)
    // for(let i = 0; i < deleted_col!.length; i++){

    // }
    for (let i = 0; i < deleted_col!.length; i++) {
      if (deleted_col && deleted_col.length > 0) {
        console.log("mat box linker", this.dragDropService.matrix_box_linker[deleted_col[i].id]);
        let boxes = this.dragDropService.matrix_box_linker[deleted_col[i].id]
        if (boxes) {
          // boxes of that cell
          while (boxes.length) {
            console.log("boxes ", boxes)
            console.log("box given to delete", boxes[0])
            this.dragDropService.deleteBox(boxes[0])
            console.log("one box deleted")
          }
        }
        delete this.dragDropService.matrix_box_linker[deleted_col![i].id];
      }
    }
    console.log("after", this.matrix_elements, this.dragDropService.matrix_box_linker)
    this.shouldInitializeDragDrop = true;
    console.log("mat box linker", this.dragDropService.matrix_box_linker)
  }

  isFirstRowChecked = false;
  isFirstColumnChecked = false;
}

//   ngAfterViewInit(): void {
//     const matrix_elements = Array.from(document.querySelectorAll('.mat')) as HTMLElement[];
//     console.log("mat elements ", matrix_elements)
//     this.dragDropService.initializeDragAndDrop([], matrix_elements);
//   }

//   add_row(){
//     var no_of_rows = this.matrix_elements.length
//     var no_of_columns = this.matrix_elements[0].length

//     console.log(no_of_rows, no_of_columns)
//     const row = [];
//     for(var i  = 1; i <= no_of_columns; i++){
//       const newMatId = `mat${no_of_rows+1}${i}`;
//       row.push({id: newMatId})
//     }
//     console.log(row)
//     console.log(this.matrix_elements)
//     this.matrix_elements.push(row)
//     const matrix_elements = Array.from(document.querySelectorAll('.mat')) as HTMLElement[];
//     console.log("HTML RETRIEVED", matrix_elements)
//     setTimeout(() => {
//       this.dragDropService.initializeDragAndDrop([], matrix_elements);
//     }, 0);
//   }

//   add_column(){
//     var no_of_rows = this.matrix_elements.length
//     var no_of_columns = this.matrix_elements[0].length

//     console.log(no_of_rows, no_of_columns)
//   }
// }
