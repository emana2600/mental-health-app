import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import {Article} from "../../model/article";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [NzButtonModule, NzCardModule, RouterLink],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  subject: Article;
  subjects : Array<Article> = new Array<Article>();
  constructor() {
    let article = new Article("depression","dajkdbakjdbakjdbakdbakbdsakbdsa");
    this.subjects.push(article)
  }


  showArticle(number: number) {
    console.log("called")
    this.subject = this.subjects[number];
    console.log(this.subject)
  }
}
