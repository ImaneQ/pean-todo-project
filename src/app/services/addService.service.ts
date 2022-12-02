import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoModel } from '../models/todo-model';

@Injectable({
  providedIn: 'root'
})
export class AddService {

  // post/get (all todos)
  urlDB = "http://localhost:5000/todos";
  // get/update/delete
  urlGUDid = this.urlDB + "/:id";

  todo!: any;
  constructor(private _http: HttpClient) { }

  postTodo(todo: any): Observable<any> {
    return this._http.post(this.urlDB, todo)
  }

  getAllTodos(): Observable<any> {
    return this._http.get(this.urlDB)
  }

  getOneTodo(todo_id: any): Observable<any> {
    console.log(todo_id);

    return this._http.get(`${this.urlDB}/${todo_id}`)
  }

  deleteOneTodo(todo_id: any) {
    return this._http.delete(`${this.urlDB}/${todo_id}`)
  }

  updateOneTodo(todo_id: any,todo_description:any): Observable<any> {
    console.log(todo_description,todo_id);

    return this._http.put(`${this.urlDB}/${todo_id}`, {"description":todo_description})
  }

}

// https://www.bezkoder.com/angular-14-node-js-express-postgresql/#Define_Routes_for_Angular_AppRoutingModule
// https://www.youtube.com/watch?v=YXfixWQApDA
// https://www.youtube.com/wahttps://www.youtube.com/watch?v=gvWxMQ_Zios&t=7681stch?v=gvWxMQ_Zios&t=7681s
