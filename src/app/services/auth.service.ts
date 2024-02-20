import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat/app"; // Import firebase/compat/app for compatibility
import Persistence = firebase.auth.Auth.Persistence;
import {Router} from "@angular/router";
import {UserModel} from "../model/user_model";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {error} from "@angular/compiler-cli/src/transformers/util";
import { NzMessageService } from 'ng-zorro-antd/message';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: firebase.User|undefined  ;
  ready = false
  myProfil : UserModel = new UserModel()
  loaded = false

  constructor(
      private afAuth: AngularFireAuth,
      private firestore : AngularFirestore,
      public router: Router,
      private storage : AngularFireStorage,
      private message :NzMessageService
  ) {

    this.initialize().then(_=>{
      console.log("initialized")
      this.loaded = true
    })
  }
  // getUser(): UserModel{
  //
  //   if(this.userData != undefined){
  //     const userDocRef = this.firestore.doc(`users/${this.userData.uid}`);
  //     userDocRef.get().subscribe(userProfil=>{
  //       let data = userProfil.data() as any
  //       this.myProfil.name = data.name
  //       this.myProfil.image = data.image
  //
  //     })
  //   }
  //   return this.myProfil;
  // }
  loadProfil(){
    if(this.userData != null) {
      const userDocRef = this.firestore.doc(`users/${this.userData.uid}`);
      let res = userDocRef.get()
      res.subscribe(value => {
        let data = value.data() as any
        console.log("data",data)
        let isProfilSet =data?.isProfilSet

        if (!data || !data.isProfilSet ) {
          console.log("called")
          let profil = new UserModel()
          profil.image = "top-right-2.png"
          profil.uid = this.userData.uid
          profil.name = this.userData.displayName
          this.myProfil = profil
          this.getProfil()
          if(isProfilSet ==undefined ||!isProfilSet) {
            userDocRef.set({
              isProfilSet: false,
              image: profil.image,
              name: this.userData.displayName,
              diary : []
            }).then(x => console.log("change profil made"))
          }
          this.router.navigate(['/select_profil'])
        }else {
          this.myProfil.image = data.image
          this.myProfil.name = data.name
          this.getProfil()
        }
      })
    }
  }
  async initialize() {
    await this.afAuth.setPersistence(Persistence.LOCAL).then(_ => {
      this.afAuth.authState.subscribe((user) => {
        if(user!=null){
          this.userData = user;
          this.loadProfil()

        }
      });
    });

  }
  async  googleLogin(){
    const result = await this.afAuth.signInWithPopup(new GoogleAuthProvider());

    this.userData = result.user;
    console.log("credentials")
    console.log(this.userData)
    this.loadProfil()

    return this.userData;
  }

  isLoggedIn(): boolean {
    console.log(this.userData)
    return this.userData != undefined;
  }
  async SignOut(): Promise<boolean> {

    try {
      await this.afAuth.signOut();
      this.userData == null
      return true // Clear user data
    } catch (error) {
      console.error(error);
      return false
    }
  }

  getProfil() {
    if (!this.myProfil.imgUrl) {
      // Subscribe to the Observable returned by getDownloadURL()
      console.log(this.myProfil.image)
      this.storage.ref("/cats").child(this.myProfil.image).getDownloadURL()
          .subscribe(
              {
                next : x=> {
                  console.log(x)
                  this.myProfil.imgUrl = x
                },
                error : err=>console.log(err)
              }
          );
    }
    // Consider returning the myProfil object here if you don't need to wait for the URL
    return this.myProfil;
  }

  changeProfilImage(name: string) {
    if(this.userData != null) {
      const userDocRef = this.firestore.doc(`users/${this.userData.uid}`);
      let res = userDocRef.get()
      this.myProfil.image = name
      this.loadProfil()
      this.router.navigate(['']).then(_=>console.log("navigated to home"))

      userDocRef.set({
        isProfilSet: true,
        image: name,
        name: this.userData.displayName
      }).then(x => this.message.info("Profil image changed, change will be visible on next reload"))
    }
  }
}
