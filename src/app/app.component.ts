import {SelectionModel} from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';

import UsersJson from '../app/data.json';


interface USERS {
  id: Number;
  name: String;
  description: String;
  webReference: String;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  id: string = "";
  name: string ="";
  description: string = "";
  webReference : string = "";
  
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]),
    description: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]),
    webReference: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]),
  });
  
  get f(){
    return this.form.controls;
  }
  
  submit(){
    console.log(this.form.value);
  }
  
  Users: USERS[] = UsersJson;
  dataSource = new MatTableDataSource(this.Users);
  displayedColumns: string[] = ['select','id','name', 'description', 'webReference'];
  selection = new SelectionModel<USERS>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  constructor(private _formBuilder: FormBuilder){
    console.log(this.Users);
    
  }
  addUsers(){
    let newArray = {
      id: this.Users.length+1,
      name: this.name,
      description: this.description,
      webReference: this.webReference
    };
    this.Users.push(newArray);
    console.log(newArray);
    console.log(this.Users);
    this.dataSource = new MatTableDataSource(this.Users);
  this.selection = new SelectionModel<USERS>(true, []);
  alert("New User added successfully");
  this.form.reset();
}
  title = 'myapp';
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //Bootstrap Modal
  
}
