import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  addForm: FormGroup = new FormGroup({})
  updateForm: FormGroup = new FormGroup({})
  employess:Employee[]=[]
  isUpdateFormActive:boolean=false
  updateIndex = 0

  constructor(
    private _date:DatePipe
  ){}

  ngOnInit(): void {
    this.createAddForm()
  }

  createAddForm(){
     this.addForm= new FormGroup({
      name: new FormControl("",[Validators.required,Validators.minLength(3)]),
      dateOfStart: new FormControl(this._date.transform(new Date(), 'yyyy-MM-dd')),
      profession: new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(20)])
     })
  }

  createUpdateForm(){
    this.updateForm = new FormGroup({
      name: new FormControl ("",[Validators.required,Validators.minLength(3)]),
      dateOfStart: new FormControl(this._date.transform(new Date(), 'yyyy-MM-dd')),
      profession: new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(20)])
    })
  }

  save(){
    if (this.addForm.valid){
      this.employess.push(this.addForm.value)
      this.createAddForm()
    }
  }

  get(model:Employee, index:number){
    this.createUpdateForm()
    this.updateForm.controls["name"].setValue(model.name)
    this.updateForm.controls["profession"].setValue(model.profession)
    this.updateForm.controls["dateOfStart"].setValue(model.dateOfStart)
    this.isUpdateFormActive=true
    this.updateIndex= index
  }

  cancel(){
    this.isUpdateFormActive=false

  }

  update(){
    if(this.updateForm.valid){
      this.employess[this.updateIndex] = this.updateForm.value
      this.cancel()
    }
  }
}

class Employee{
  name:string=""
  profession:string=""
  dateOfStart:string=""
}