import {Component} from "@angular/core";
import {FormBuilder,FormGroup,Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {AngularFirestore,AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {User} from './user';
import {Observable} from "rxjs";
import {LoginService} from "./login.service";

@Component({
  selector:'user-form',
  templateUrl:'user-form.component.html'
})

export class UserFormComponent{
  id: string | undefined;
  form: FormGroup;
  title: string | undefined;
  user = new User();
  userDoc: AngularFirestoreDocument<User> | undefined;
  singleUser: Observable<User> | undefined;

  constructor(fb: FormBuilder, private _router:Router, private afs:AngularFirestore,private _route:ActivatedRoute, private _loginService:LoginService) {
    this.form = fb.group({
      username:['', Validators.required],
      email:['', Validators.required]
    })
  }

  ngOnInit(){
    this._route.params.subscribe(params => {
      this.id = params["id"];
    });

    if(!this.id){
      this.title = "New User";
    }
    else{
      this.title = "Edit User";
      this.userDoc = this.afs.doc('users/'+this._loginService.loggedInUser+"/clients/"+this.id);
      // @ts-ignore
      this.singleUser = this.userDoc.valueChanges();
      // @ts-ignore
      this.singleUser.subscribe((user) =>{
        // @ts-ignore
        this.form.get('username').setValue(user.name);
        // @ts-ignore
        this.form.get('email').setValue(user.email);
      });
    }
  }

  submit(){
    if (this.id) {
      this.afs.doc('users/'+this._loginService.loggedInUser+
        "/clients/"+this.id).update({
        name: this.user.name,
        email: this.user.email
      });   ;
    }
    else{
      this.afs.collection("users")
        .doc(this._loginService.loggedInUser)
        .collection("clients").add({
        name: this.user.name,
        email: this.user.email
      });
    }
    this._router.navigate(['']);
  }


}
