import { Component } from '@angular/core';
import { AngularFirestoreCollection,AngularFirestore} from "@angular/fire/compat/firestore";
import {Route, Router} from '@angular/router';
import { map } from 'rxjs/operators';
import {Observable} from "rxjs";
import {collectionChanges} from "rxfire/firestore";
import firebase from "firebase/compat";
import UserInfo = firebase.UserInfo;
import {LoginService} from "./login.service";

interface User{
  name: string;
  email: string;
}

@Component({
  selector: 'users',
  templateUrl: './user.component.html'
})
export class UserComponent {

  usersCol: AngularFirestoreCollection<User>;
  users: any;

  constructor(private readonly afs: AngularFirestore,_router:Router,private _loginService:LoginService) {

  }

  ngOnInit(){
    this.usersCol = this.afs.collection('users');
    this._loginService.loggedInUser+'/clients';
    this.users = this.usersCol.valueChanges();
  }
  delete(userId: any, name: string){
    if(confirm("Are you sure you want to delete  " + name +"?")){
      this.afs.doc('users' + this._loginService.loggedInUser+ "/clients"+ userId).delete();

    }
  }

}
