import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import { NzMenuModule } from 'ng-zorro-antd/menu';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AngularFireAuthModule,
    NzMenuModule

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mental-health-app';
}
