import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Dialog} from "../model/dialog";
import {map, Observable, of} from "rxjs";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";



@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  private exchange  = new Array<Dialog>()
  collection : AngularFirestoreCollection
  constructor(private http : HttpClient,private firestore : AngularFirestore,private auth : AuthService, private router : Router,private message :NzMessageService) {
    this.exchange.push(new Dialog("1","system","you're going to act as a psychologist and advise me you dont need to repeat my instructions just listen to me and give me some short and concise answer direclty"))

    //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
    /**
     * curl https://api.openai.com/v1/chat/completions \
     *   -H "Content-Type: application/json" \
     *   -H "Authorization: Bearer $OPENAI_API_KEY" \
     *   -d '{
     *     "model": "gpt-3.5-turbo",
     *     "messages": [
     *       {
     *         "role": "system",
     *         "content": "You are a helpful psychologist."
     *       },
     *       {
     *         "role": "user",
     *         "content": "Hello!"
     *       }
     *     ]
     *   }'
     */
  }
  sendMessage(message : string,dialogs : Dialog[]){
    let dialog = new Dialog(dialogs.length.toString(),"user",message)
    console.log(dialogs)
    if(dialogs.length==0)this.addMessage(this.exchange[0])
    this.exchange.push(dialog)
    this.addMessage(dialog)
    let body = {
      "model": "mistral-small",
      "messages": this.exchange
    }
    let httpheader = new HttpHeaders(

    ).set("Authorization","Bearer Qr6E4L2pogBxjjnDQjAJ6B0ZGoDtC3oV").set("Content-Type","application/json")
    return  this.http.post("https://api.mistral.ai/v1/chat/completions",body,{
      headers : httpheader
    })

  }
  get messages():Observable<Array<Dialog>>{
    if(!this.auth.userData || !this.auth.userData.uid) {
      this.router.navigate([""]).then(x=>{
        this.message.warning("you need to connect first")
        return of(new Array<Dialog>())
      })
    }
    return this.firestore.doc(`users/${this.auth.userData.uid}`).collection("messages").snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data()
            console.log(new Date(data["date"]))
            return new Dialog(a.payload.doc.id,data["subject"],data["message"],new Date(data["date"]))
          });
        })
    );
  }

  addMessage(dialog: Dialog) {
    this.firestore.doc(`users/${this.auth.userData.uid}`).collection("messages").add({
      "subject" : dialog.role,
      "message" : dialog.content,
      "date" : new Date().getTime()
    }).then(x=>{
      console.log("Message Sended : ",x)
    })

  }
}
