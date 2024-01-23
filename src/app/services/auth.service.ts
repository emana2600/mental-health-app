import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import {interval} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from 'firebase/compat';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any ;
  ready = false
  constructor(private afAuth: AngularFireAuth) {
    this.initialize().then(_=>{
      this.ready = true;
      console.log(this.ready)
    })
  }
  async initialize() {

  }
  async  googleLogin(){
    const result = await this.afAuth.signInWithPopup(new GoogleAuthProvider());
    this.userData = result.user;
    return this.userData;
  }
  IsLoggedIn(): boolean {


    return !!this.userData; // Check if user is logged in
  }
  async SignOut(): Promise<boolean> {

    try {

      await this.afAuth.signOut();
      return true // Clear user data
    } catch (error) {
      console.error(error);
      return false
    }
  }
}
