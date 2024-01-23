import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-tab-two',
  standalone: true,
  imports: [NzIconModule],
  templateUrl: './tab-two.component.html',
  styleUrl: '../tab-style.css'

})
export class TabTwoComponent {
  constructor(private authService : AuthService) {
  }
  login(){
    this.authService.googleLogin().then(userdata=>{
      console.log(userdata)
    });
  }
}
