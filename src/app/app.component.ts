import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from './component/add-edit/add-edit.component';
import {MatTableDataSource} from '@angular/material/table';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUser()
  }
  title = 'ProjectX';
constructor(private _dialog:MatDialog,private _userservice:UserService){}
  openAddEdit(){
    const refdialog=  this._dialog.open(AddEditComponent)
    refdialog.afterClosed().subscribe({
      next:(value) =>{
        this.getUser()
      },
      error(err) {
        console.log(err);
        
      },
    })
  }
  displayedColumns: string[] = ['id','nom', 'prenom','email', 'Date Naissance', 'genre','adresse','ville','Action'];
  dataSource !: MatTableDataSource<any>;
  suppUser(id:number){
    this._userservice.deletUser(id).subscribe({
      next:(val)=> {
        console.log();
        this.getUser();
        this._userservice.openSnackBar('user est Supprimer','done')
        
      },
      error(err) {
        console.log(err);
        
      },
    })
  }
  getUser(){
    this._userservice.userlist().subscribe({
      next:(val:any)=>{
        console.log(val);
        this.dataSource=new MatTableDataSource(val)
        
        
      },
      error(err) {
        console.log(err);
        
      },
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

}

EditAddEdit(data:any){
  const refdialog= this._dialog.open(AddEditComponent,{
    data
  })
  
  refdialog.afterClosed().subscribe({
    next:(value) =>{
      this.getUser()
    },
    error(err) {
      console.log(err);
      
    },
  })
    }
}
