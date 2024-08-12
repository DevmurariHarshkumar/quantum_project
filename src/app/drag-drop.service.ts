import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {
  private draggedItemSource = new BehaviorSubject<HTMLElement | null>(null);
  draggedItem$ = this.draggedItemSource.asObservable();
  
  setDraggedItem(item: HTMLElement | null) {
    console.log("draggedItem$1", item)
    this.draggedItemSource.next(item);
    console.log("draggedItem$2", item)
  }

  getDraggedItem(){
    return this.draggedItem$;
  }

  testing(){
    console.log("testing")
  }
} 