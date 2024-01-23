import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import {WelcomeComponent} from "./page/welcome/welcome.component";
import { NzIconModule } from 'ng-zorro-antd/icon';



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
    NzIconModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mental-health-app';
  login(){

  }
}
