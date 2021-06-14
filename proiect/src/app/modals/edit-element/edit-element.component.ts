import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-element',
  templateUrl: './edit-element.component.html',
  styleUrls: ['./edit-element.component.less']
})
export class EditElementComponent implements OnInit {

  chemicalForm: FormGroup = new FormGroup({});
  
  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditElementComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.chemicalForm = this.formBuilder.group({
      nume: [this.data.nume,Validators.required],
      prenume: [this.data.prenume,Validators.required],
      email: [this.data.email,Validators.required],
      oras:[this.data.oras,Validators.required],
      birhtday:[this.data.birhtday,Validators.required]
    })

    console.log(this.data);
  }

  onNoClick(){
    this.dialogRef.close();
  }
}
