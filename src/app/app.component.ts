import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {NzIconModule} from 'ng-zorro-antd/icon';
import {AuthService} from "./services/auth.service";
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import {pickRandomCatImage} from "../data/cat-image";
import { NzButtonModule } from 'ng-zorro-antd/button';
import {MESSAGE_LIST} from "../data/message-list";




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AngularFireAuthModule,
    NzMenuModule,
    NzTabsModule,
    WelcomeComponent,
    NzIconModule,
    NzPopoverModule,
    NgOptimizedImage,
    NzButtonModule,
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit{
  title = 'mental-health-app';
  user: any
  isLoggedIn = false
  baseCatPath = "assets/images/cats/"
  catSourcePath = this.baseCatPath+pickRandomCatImage()+".png"
  position: string = "top-left";
  message  = "no messsage";
  isPoppoverVisible= false;
  poppoverShown =false;
  @ViewChild('floatingMessage') floatingMessage: ElementRef
  constructor(private auth: AuthService) {
    this.isLoggedIn = this.auth.isLoggedIn();


  }
  randomMessage = MESSAGE_LIST[Math.floor(Math.random() * MESSAGE_LIST.length)];
  randomPlacement = this.getRandomPosition();

  ngAfterViewInit() {

    // this.poppoverShown = false
    this.triggerPoppover();
  }
updateMessageAndPosition(){
    console.log(this.floatingMessage);
  this.catSourcePath = this.baseCatPath+pickRandomCatImage()+".png"
  this.randomMessage = MESSAGE_LIST[Math.floor(Math.random() * MESSAGE_LIST.length)];
  this.randomPlacement = this.getRandomPosition();
  const buttonElement = this.floatingMessage.nativeElement.querySelector('button');
  buttonElement.style.opacity = 1
  buttonElement.style.left  = `${this.randomPlacement.left}px`;
  buttonElement.style.top = `${this.randomPlacement.top}px`;
}
   triggerPoppover () {

    setInterval(x => {
      this.poppoverShown = true;
      this.updateMessageAndPosition();
      console.log("triggered")

      this.triggerInterval();
    }, 1200000)
  }
  getRandomPosition() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return {
      left: Math.floor(Math.random() * width),
      top: Math.floor(Math.random() * height),
    };
  }

  async login() {
    if (this.isLoggedIn) {
      await this.auth.SignOut();
    } else {
      this.user = await this.auth.googleLogin();
      this.isLoggedIn = !!this.user
    }
  }

  private triggerInterval() {
    setTimeout(x=>{
      this.isPoppoverVisible = true;
    },2000)
    setTimeout(x=>{
      this.isPoppoverVisible = false;
    },10000)
    setTimeout(x=>{
      this.poppoverShown = false;
      const buttonElement = this.floatingMessage.nativeElement.querySelector('button');
      buttonElement.style.opacity = 0
    },14000)
  }
}
