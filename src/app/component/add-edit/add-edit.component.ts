import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})

export class AddEditComponent implements OnInit {
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userForm.patchValue(this.data)
  }
  userForm:FormGroup;
  
  constructor(private fb:FormBuilder,private _user:UserService,private _dialog:MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA)public data:any){
    this.userForm=this.fb.group({
    nom:'',
    prenom:'',
    dateN:'',
    email:'',
    genre:'',
    adresse:'',
    ville:''
    })
  }
  formsubmit(){
   if (this.userForm.valid) {
    console.log(this.userForm.value);
    
    if (this.data) {
      this._user.useredit(this.data._id,this.userForm.value).subscribe({
        next:(val:any)=>{
        console.log(this.data);
        
        this._user.openSnackBar('user est Editer','done');
          this._dialog.close(true)
         
          
          
       },
       error(err) {
         console.log(err);
          
       },
      })
    } else {
      this._user.usercreat(this.userForm.value).subscribe({
        next:(val:any)=>{
        
        let userName = this.userForm.controls['nom'].value
       console.log(userName);
       
        this._user.openSnackBar('user '+userName+ ' est ajouter','done')
          this._dialog.close(true)
          
          
          
       },
       error(err) {
         console.log(err);
          
       },
      })
    }
      
      
    }
 }
  }
  

