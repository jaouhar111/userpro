import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient,private _snackBar: MatSnackBar) { }

  usercreat(data:any): Observable<any>
   {
    return this._http.post("http://localhost:3000/user",data)
  }
  useredit(id:number,data:any): Observable<any>
   {
    return this._http.put("http://localhost:3000/user/"+id,data)
  }

  userlist(): Observable<any>{
    return this._http.get("http://localhost:3000/user")
  }

  deletUser(id:number): Observable<any>{
    return this._http.delete("http://localhost:3000/user/"+id)
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration:3000,
      verticalPosition:'top',
    });
  }
}
