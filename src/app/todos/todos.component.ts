import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlDirective, FormGroup, FormsModule, RequiredValidator, Validators } from '@angular/forms';

import { AddService } from '../services/addService.service';
import { EditModalComponent } from './../modals/edit-modal/edit-modal.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoModel } from './../models/todo-model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  urlDB = "http://localhost:5000/todos";
  todoForm!: FormGroup;
  newTodo = new TodoModel();
  // newTodo: TodoModel = new TodoModel();

  arrayForTodos: any[] = [];
  toDo!: any;
  todos!: TodoModel[];
  constructor(private _fb: FormBuilder,
    private _addService: AddService,
    private _matDialog: MatDialog,
    private _http: HttpClient,
    private _snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.todoForm = this._fb.group({
      description: ['', Validators.required],
      todo_id: [this.newTodo.todo_id]
    })

    this._addService.getAllTodos().subscribe((all: any) => {
      console.log(all);
      this.arrayForTodos.push(all)
      console.warn('arrayForTodos', this.arrayForTodos[0]);

    })

    // this.addTodo()
    this.deleteTask(this.newTodo)
    // this.arrayForTodos = this.arrayForTodos.sort((a: any, b: any) => b.newTodo - a.newTodo)

  }

  addTodo() {

    const todoValue = this.todoForm.value;
    // console.log(todoValue);

    this.newTodo = Object.assign(this.newTodo, todoValue)
    this._addService.postTodo(todoValue).subscribe((todoObject: any) => {
      console.log(todoObject);
      this.newTodo = todoObject;
      this.arrayForTodos.push(this.newTodo)

    })
    // console.warn('newTodo', this.newTodo);
    this.todoForm.reset()

  }

  getUniqueTodo() {
    this._addService.getOneTodo(this.newTodo.todo_id).subscribe((objectTodo: any) => {
      console.warn('my object',objectTodo);

    })

  }

  deleteTask(id: any) {

    this._http.delete(this.urlDB + '/' + id).subscribe();

    this._snackBar.open('To do has been deleted !', 'Close', {
      duration: 3000
    });

    this.arrayForTodos = this.arrayForTodos.filter((todo: any) => todo.todo_id != id)
  }



  onOpenModal(todoSelected: TodoModel): void {

    const modalRef = this._matDialog.open(EditModalComponent, {
      width: '25vw', //sets width of dialog
      height: '40vh',
      enterAnimationDuration: '800ms',
      exitAnimationDuration: '800ms',
      data: todoSelected
    })
    console.log(todoSelected);


    modalRef.afterClosed().subscribe((responseFromModal: any) => {

      // if (responseFromModal) {
      //   this._addService.updateOneTodo(responseFromModal)
      // }
      console.log(responseFromModal);

      this._snackBar.open('To do was updated !', 'Close', {
        duration: 3000
      });
    })
  }

}
