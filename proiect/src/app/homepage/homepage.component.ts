
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddElementComponent } from '../modals/add-element/add-element.component';
import { EditElementComponent } from '../modals/edit-element/edit-element.component';
import {Emitters} from '../emitters/emitters';
import {HttpClient} from '@angular/common/http';
export interface PeriodicElement {
  nume: string;
  prenume: string;
  email: string;
  oras: string;
  birhtday:string;
}



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.less']
})





export class HomepageComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nume', 'prenume', 'email', 'oras','birhtday','actions'];
  myList: PeriodicElement[] = [
    {nume: 'Ferca', prenume: 'Neacsu', email: 'neacsu@gmail.com', oras: 'Brasov',birhtday:'12/02/1999'},
    {nume: 'Simon', prenume: 'Toma', email: 'toma@yahoo.com', oras: 'Feldioara',birhtday:'10/06/1992'},
    
  ];
  dataSource = new MatTableDataSource(this.myList);
  chemicalForm: FormGroup = new FormGroup({});

  symbolSearchValue;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private http: HttpClient) { }

  ngOnInit(): void {
    
    this.initForm();
        this.http.get('http://localhost:8000/api/user', {withCredentials: true}).subscribe(
          (res: any) => {
            
            Emitters.authEmitter.emit(true);
          },
          err => {
            
            Emitters.authEmitter.emit(false);
          }
        );
  }

  initForm(){
    this.chemicalForm = this.formBuilder.group({
      nume: [''],
      prenume: [''],
      email: [''],
      oras: [''],
      birhtday:['']
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onRowClick(row){
    console.log(row);
  }

  onAdd(){
    this.myList.push(this.chemicalForm.value);
    this.dataSource.data = this.myList;
  }

  onDelete(row){
    const index = this.myList.indexOf(row);

    if (index > -1) {
      this.myList.splice(index, 1);
      this.dataSource.data = this.myList;
    }
  }

  searchBySymbol(){
    this.dataSource.data = this.myList.filter(e => e.prenume.toLowerCase() == this.symbolSearchValue.toLowerCase());
  }

  clearSymbolSearch(){
    this.symbolSearchValue = '';
    this.dataSource.data = this.myList;
  }

  openAddDialog(){
    const dialogRef = this.dialog.open(AddElementComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      if(result){
        this.myList.push(result.value);
        this.dataSource.data = this.myList;
      }
      
    });
  }

  onEdit(row){

      const dialogRef = this.dialog.open(EditElementComponent, {
        width: '250px',
        data: row
      });
  
      dialogRef.afterClosed().subscribe(result => {
        const index = this.myList.splice(result.position,1);
        
      });
  }
}