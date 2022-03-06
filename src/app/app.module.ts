import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";

import {AngularFireAnalyticsModule} from "@angular/fire/compat/analytics";
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {UserComponent} from "./user.component";
import {routing} from "./app.routing";
import {UserFormComponent} from "./user-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "./login.component";
import {LoginService} from "./login.service";
import {SignupComponent} from "./signup.component";
import {AuthGuard} from "./auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserFormComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    routing, ReactiveFormsModule,


  ],
  providers: [
    AngularFirestore,
    LoginService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
