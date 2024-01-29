import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Dialog} from "../model/dialog";



@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  private exchange  = (new Array<Dialog>())
  constructor(private http : HttpClient) {
    this.exchange.push(new Dialog(1,"system","you're going to act as a psychologist and advise me you dont need to repeat my instructions just listen to me and give me some short and concise answer direclty"))

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
  sendMessage(message : string){
    this.exchange.push(new Dialog(this.exchange.length,"user",message))
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


  addMessage(dialog: Dialog) {

    this.exchange.push(new Dialog(this.exchange.length,dialog.role,dialog.content))
  }
}
