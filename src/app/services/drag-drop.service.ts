import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {
  isQuestionPage = true;
  box_till_now = 0
  private draggedItemSource = new BehaviorSubject<HTMLElement | null>(null);
  draggedItem$ = this.draggedItemSource.asObservable();
  matrix_box_linker: { [key: string]: string[] } = {};
  matrix_box_linker_answer: { [key: string]: string[] } = {};
  private boxxesSource = new BehaviorSubject<any[]>([]);
  boxxes$ = this.boxxesSource.asObservable();
  
  
  setisQuestionPage(val: boolean) {
    this.isQuestionPage = val;
  }
  getisQuestionPage() {
    return this.isQuestionPage;
  }
  get_matrix_box_linker_answer(){
    return this.matrix_box_linker_answer
  }
  set_matrix_box_linker_answer(val:any){
    this.matrix_box_linker_answer = val
  }



  // Update the boxes array
  updateBoxes(newBoxes: any[]): void {
    this.boxxesSource.next(newBoxes);
    // console.log("UPDATED BOXES NOW: ", newBoxes);
  }

  addBox(): void {
    this.box_till_now += 1
    const currentBoxes = this.boxxesSource.getValue();
    const newBoxId = `box${this.box_till_now}`;
    const newBox = { id: newBoxId, label: `Response ${this.box_till_now}`, isEditing: false };
    const updatedBoxes = [...currentBoxes, newBox];
    this.updateBoxes(updatedBoxes);
  }

  deleteBox(boxId: string): void {
    // console.log("inside del box", boxId);
    const currentBoxes = this.boxxesSource.getValue();
    const updatedBoxes = currentBoxes.filter(box => box.id !== boxId);
    this.updateBoxes(updatedBoxes);
    this.cleanupDeletedBox(boxId);
  }

  cleanupDeletedBox(deletedBoxId: string): void {
    if (this.isQuestionPage) {
      for (const key in this.matrix_box_linker) {
        const index = this.matrix_box_linker[key].indexOf(deletedBoxId);
        if (index > -1) {
          this.matrix_box_linker[key].splice(index, 1);
        }
      }
    }
    else {
      for (const key in this.matrix_box_linker_answer) {
        const index = this.matrix_box_linker_answer[key].indexOf(deletedBoxId);
        if (index > -1) {
          this.matrix_box_linker_answer[key].splice(index, 1);
        }
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

          // QUESTIONPAGE
          if (this.isQuestionPage) {
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
            console.log("mat_box_linker", this.matrix_box_linker)

          }
          else {
            for (const key in this.matrix_box_linker_answer) {
              const index = this.matrix_box_linker_answer[key].indexOf(draggedItem.id);
              if (index > -1) {
                this.matrix_box_linker_answer[key].splice(index, 1);
              }
            }
            if (!this.matrix_box_linker_answer[event.target.id]) {
              this.matrix_box_linker_answer[event.target.id] = [];
            }
            this.matrix_box_linker_answer[event.target.id].push(draggedItem.id);
            console.log("answer page mat_box_linker", this.matrix_box_linker_answer);
          }

          this.setDraggedItem(null);
        }
      });
    });
  }


  shouldInitializeDragDrop = false;
  private isFirstRowChecked = new BehaviorSubject<boolean>(false);
  frc$ = this.isFirstRowChecked.asObservable();
  private isFirstColumnChecked = new BehaviorSubject<boolean>(false);
  fcc$ = this.isFirstColumnChecked.asObservable();
  // private matrix_elements = new BehaviorSubject<any[][]>([
    //   [{ id: 'mat11' }, { id: 'mat12' }, { id: 'mat12' }],
    //   [{ id: 'mat21' }, { id: 'mat22' }, { id: 'mat22' }],
    //   [{ id: 'mat31' }, { id: 'mat32' }, { id: 'mat32' }]
    // ])
  private matrix_elements = new BehaviorSubject<any[][]>([
    [{ id: 'mat11' }, { id: 'mat12' }],
    [{ id: 'mat21' }, { id: 'mat22' }]
  ])
  me$ = this.matrix_elements.asObservable();
  
  add_row() {
    const no_of_rows = this.matrix_elements.getValue().length;
    const no_of_columns = this.matrix_elements.getValue()[0].length;
    const row = [];
    for (let i = 1; i <= no_of_columns; i++) {
      const newMatId = `mat${no_of_rows + 1}${i}`;
      row.push({ id: newMatId });
    }
    this.matrix_elements.getValue().push(row);
    this.shouldInitializeDragDrop = true;
  }
  
  add_column() {
    const no_of_rows = this.matrix_elements.getValue().length;
    const no_of_columns = this.matrix_elements.getValue()[0].length + 1; // New column index
    
    for (let rowIndex = 0; rowIndex < no_of_rows; rowIndex++) {
      const newMatId = `mat${rowIndex + 1}${no_of_columns}`;
      this.matrix_elements.getValue()[rowIndex].push({ id: newMatId });
    }
    this.shouldInitializeDragDrop = true;
  }
  
  
  del_row() {
    const deleted_row = this.matrix_elements.getValue().pop();
    // for cell of deleted row
    for (let i = 0; i < deleted_row!.length; i++) {
      if (deleted_row && deleted_row.length > 0) {
        // console.log("mat of row", deleted_row[i].id);
        // console.log("mat box link", this.matrix_box_linker);
        // boxes of that cell
        let boxes = this.matrix_box_linker[deleted_row[i].id]
        if (boxes) {
          // boxes of that cell
          while (boxes.length) {
            // console.log("boxes ", boxes)
            // console.log("box given to delete", boxes[0])
            this.deleteBox(boxes[0])
            // console.log("one box deleted")
          }
        }
        // }
        delete this.matrix_box_linker[deleted_row![i].id];
      }
    }
    // console.log("after", this.matrix_elements, this.matrix_box_linker)
    this.shouldInitializeDragDrop = true;
    // console.log("mat box linker", this.matrix_box_linker)
  }
  
  del_column() {
    let deleted_col = [];
    for (let rowIndex = 0; rowIndex < this.matrix_elements.getValue().length; rowIndex++) {
      deleted_col.push(this.matrix_elements.getValue()[rowIndex].pop());
    }
    // console.log("deleted_col", deleted_col)
    // for(let i = 0; i < deleted_col!.length; i++){
      
    // }
    for (let i = 0; i < deleted_col!.length; i++) {
      if (deleted_col && deleted_col.length > 0) {
        // console.log("mat box linker", this.matrix_box_linker[deleted_col[i].id]);
        let boxes = this.matrix_box_linker[deleted_col[i].id]
        if (boxes) {
          // boxes of that cell
          while (boxes.length) {
            // console.log("boxes ", boxes)
            // console.log("box given to delete", boxes[0])
            this.deleteBox(boxes[0])
            // console.log("one box deleted")
          }
        }
        delete this.matrix_box_linker[deleted_col![i].id];
      }
    }
    // console.log("after", this.matrix_elements, this.matrix_box_linker)
    this.shouldInitializeDragDrop = true;
    // console.log("mat box linker", this.matrix_box_linker)
  }
  
  
  updatefirstcol(val:boolean){
    this.isFirstColumnChecked.next(val);
    console.log("DDDDDDDDDDDDDDDDDDDDDDDDD", val);
  }
  updatefirstrow(val:boolean){
    this.isFirstRowChecked.next(val);
    console.log("DDDDDDDDDDDDDDDDDDDDDDDDD", val);
  }

  
  correct_boxes: any[] = []
  wrong_boxes: any[] = []
  
  get_correct_boxes(){
    return this.correct_boxes;
  }
  get_wrong_boxes(){
    return this.wrong_boxes;
  }
  set_correct_boxes(val:any[]){
    this.correct_boxes = val
  }
  set_wrong_boxes(val:any[]){
    this.wrong_boxes = val
  }
  
  answer_checker() {
    this.correct_boxes = []
    this.wrong_boxes = []
    // console.log(this.matrix_box_linker_answer);
    // console.log(this.matrix_box_linker);
    // console.log("type", this.matrix_box_linker_answer[0]);
    for (const cell in this.matrix_box_linker_answer) {
      if (cell in this.matrix_box_linker) {
        // console.log("yes in both cell", cell)
        this.matrix_box_linker_answer[cell].forEach(box => {
          if (this.matrix_box_linker[cell].includes(box)) {
            // console.log("correct", box);
            this.correct_boxes.push(box)
          }
          else{
            // console.log("wrong", box);
            this.wrong_boxes.push(box)
          }
        });
      }
      else {
        this.matrix_box_linker_answer[cell].forEach(box => {
          this.wrong_boxes.push(box)
        });
      }
    }

    console.log("correct boxes", this.correct_boxes);
    console.log("wrong boxes", this.wrong_boxes);
  }

}
