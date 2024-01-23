import { Component } from '@angular/core';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCardModule } from 'ng-zorro-antd/card';
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-tab-three',
  standalone: true,
  imports: [
    NzCheckboxModule,
    NzCardModule,
    FormsModule
  ],
  templateUrl: './tab-three.component.html',
  styleUrl: '../tab-style.css'
})
export class TabThreeComponent {
  checked: any;

  updateCheckBox($event: any) {
    console.log($event)
  }
}
