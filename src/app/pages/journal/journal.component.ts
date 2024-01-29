import { Component } from '@angular/core';
import {DiaryService} from "../../services/diary.service";
import { NzInputModule } from 'ng-zorro-antd/input';
import {FormsModule} from "@angular/forms";
import { NzCardModule } from 'ng-zorro-antd/card';
import {Dialog} from "../../model/dialog";

@Component({
  selector: 'app-journal',
  standalone: true,
  imports: [NzInputModule, FormsModule,NzCardModule],
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.css'
})
export class JournalComponent {
  message = "";
  messages: Array<Dialog> = new Array<Dialog>();
  index = 1
  constructor(private diaryService : DiaryService) {

  }
  sendMessage(){
    console.log(this.message)
    this.diaryService.sendMessage(this.message).subscribe(data =>{
      let dialog = new Dialog(this.index,"user",this.message)
      this.messages.push(dialog);
      this.index ++;
      console.log(data)
      let mess = data["choices"][0].message
       dialog = new Dialog(this.index,mess["role"],mess["content"])
      this.diaryService.addMessage(dialog)
      this.messages.push(dialog);
      this.index ++;
      /**
       * {
       *     "id": "72e76edfd2f84bb2acda528785d3b999",
       *     "object": "chat.completion",
       *     "created": 1706462701,
       *     "model": "mistral-tiny",
       *     "choices": [
       *         {
       *             "index": 0,
       *             "message": {
       *                 "role": "assistant",
       *                 "content": "I'm here to listen and offer support as best I can. It's normal to feel overwhelmed with work, especially if you've been working a lot lately. It's important to take care of both your physical and emotional well-being during this time.\n\nFirst, I would encourage you to focus on getting enough rest. Make sure you're getting at least 7-8 hours of sleep each night. Lack of sleep can negatively impact your mood, energy levels, and ability to focus.\n\nNext, try to incorporate some relaxation techniques into your daily routine. Deep breathing exercises, progressive muscle relaxation, or meditation can help reduce stress and improve your overall sense of calm.\n\nIt's also important to make time for activities that bring you joy and help you relax, such as reading, taking a walk, or engaging in a hobby.\n\nIf you're feeling particularly overwhelmed, it may be helpful to prioritize your tasks and delegate some responsibilities to others if possible. Remember that it's okay to ask for help and take breaks when needed.\n\nFinally, consider practicing positive self-talk and focusing on the things you're grateful for. This can help improve your mood and increase your resilience during stressful times.\n\nIf you continue to feel overwhelmed or unable to manage your workload, it may be helpful to speak with a mental health professional for additional support. They can help you develop coping strategies and provide guidance on how to manage your workload and prioritize your time."
       *             },
       *             "finish_reason": "stop"
       *         }
       *     ],
       *     "usage": {
       *         "prompt_tokens": 28,
       *         "total_tokens": 347,
       *         "completion_tokens": 319
       *     }
       * }
       */
    })
  }
}
