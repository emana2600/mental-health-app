import { Component } from '@angular/core';
import {DiaryService} from "../../services/diary.service";
import { NzInputModule } from 'ng-zorro-antd/input';
import {FormsModule} from "@angular/forms";
import { NzCardModule } from 'ng-zorro-antd/card';
import {Dialog} from "../../model/dialog";
import { NzIconModule } from 'ng-zorro-antd/icon';
import {DomSanitizerPipe} from "../../pipe/dom-sanitizer.pipe";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
import {ProfilDirectiveDirective} from "../../directive/profil-directive.directive";
import {NzMessageService} from "ng-zorro-antd/message";
import {NgStyle} from "@angular/common";

import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-journal',
  standalone: true,
  imports: [NzInputModule, FormsModule, NzCardModule, NzIconModule, DomSanitizerPipe, ProfilDirectiveDirective, NgStyle],
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.css'
})
export class JournalComponent {
  message = "";
  messages: Array<Dialog> = new Array<Dialog>();
  index = 1
  isClicked = false
  interVal = 0
  loaded = false
  constructor(private diaryService : DiaryService,
              protected auth : AuthService,
              private router : Router,
              private el: ElementRef,
              private renderer: Renderer2,
              message : NzMessageService,
              public domSanitizer: DomSanitizer
) {

    this.interVal =setInterval(x=>{
      if(this.auth.loaded ){
        if(this.auth.userData) {
          this.diaryService.messages.subscribe(messages => {
            this.messages = messages.sort((before, after) => {
              return after.date > before.date ? -1 : 1
            }).slice(1,)
            console.log("messages", messages)
          })
        }else this.router.navigate(["/"]).then(r => message.error("Need To Login To access the Diary"))
        clearInterval(this.interVal)
      }
    })
  }
  get imgUrl (){
    this.domSanitizer.bypassSecurityTrustUrl(this.auth.myProfil.imgUrl)
    return this.auth.myProfil.imgUrl
  }
  sendMessage(){
    if(!this.isClicked && this.message.trim()!="") {
      this.isClicked = true;
      let message = this.message
      this.message = ""
      this.diaryService.sendMessage(message,this.messages).subscribe(data => {
        let mess = data["choices"][0].message
        let dialog = new Dialog(this.index.toString(), mess["role"], mess["content"])
        this.diaryService.addMessage(dialog)
        this.index++;
        this.isClicked = false;
      })
    }
  }


  showMessage($event: KeyboardEvent) {
    if($event.key == 'Enter' && this.message.trim() != ""){
      this.sendMessage()
    }

  }
}
