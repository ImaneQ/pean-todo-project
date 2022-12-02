import { TodoModel } from './../../models/todo-model';
import { AddService } from './../../services/addService.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

  editForm!: FormGroup;
  description = new FormControl();
  constructor(@Inject(MAT_DIALOG_DATA) public edit: any,
    private _dialogRef: MatDialogRef<any>,
    private _fb: FormBuilder,
    private _addService: AddService) { }

  ngOnInit(): void {
    console.warn('datas for modal', this.edit);
    this.editForm = this._fb.group({
      description: this.edit.description

    })
    this.description.setValue(this.edit.description)


  }

  onClick(todo: any) {
    console.log('EDIT',this.edit);
    console.log(todo);

    this._addService.updateOneTodo(todo.edit.todo_id, todo.editForm.value.description).subscribe((response: any) => {
      // todo_id: this.todo.todo_id,
      // description: this.description.value
      console.log(this);

      this._dialogRef.close(
        {
          todo_id: this.edit.todo_id,
          description: todo.editForm.value.description
        }
      )
      console.warn('response', response);
    })
  }

  onCancel() {
    this._dialogRef.close()
  }

}
