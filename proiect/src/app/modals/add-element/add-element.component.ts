import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.less']
})
export class AddElementComponent implements OnInit {


  chemicalForm: FormGroup = new FormGroup({});
  
  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddElementComponent>) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.chemicalForm = this.formBuilder.group({
      nume: ['',Validators.required],
      prenume: ['',Validators.required],
      email: ['',Validators.required],
      oras:['',Validators.required],
      birhtday:['',Validators.required]
    })
  }

  onNoClick(){
    this.dialogRef.close();
  }

  
}
