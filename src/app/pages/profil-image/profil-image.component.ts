import { Component } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {NgOptimizedImage} from "@angular/common";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-profil-image',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './profil-image.component.html',
  styleUrl: './profil-image.component.css'
})
export class ProfilImageComponent {
  imageList : Array<{name : string, url:string}> = new Array<{name: string; url: string}>()
  constructor(private storage : AngularFireStorage,private auth : AuthService) {
    this.loadImage()
  }
  loadImage(){
    this.storage.ref("/cats").listAll().subscribe(x=>{
      x.items.forEach(x=>{

        x.getDownloadURL().then(y=>{

       this.imageList.push({
         name : x.name,
         url : y
       })
       });
      })
    })
  }

  selectImage(name:string) {
    this.auth.changeProfilImage(name)
  }
}
