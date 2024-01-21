import {Component, ElementRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import {TabOneComponent} from "./tabs/tab-one/tab-one.component";
import {TabTwoComponent} from "./tabs/tab-two/tab-two.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AngularFireAuthModule,
    NzMenuModule,
    NzTabsModule,
    TabOneComponent,
    TabTwoComponent

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('tabsContainer') tabsContainer: ElementRef;

  title = 'mental-health-app';
  effect : string = `scrollx`
  tabs = [1, 2, 3, 4];
  selectedIndex =0
  login(){

  }

  ngAfterViewInit() {
    const tabsContainer = this.tabsContainer.nativeElement;

    tabsContainer.addEventListener('keydown', (event: { key: string; }) => {
      console.log('clicked')
      if (event.key === 'ArrowLeft') {
        this.slideLeft();
      } else if (event.key === 'ArrowRight') {
        this.slideRight();
      }
      tabsContainer.focus();
    });
  }
  slideLeft() {
    this.selectedIndex = Math.max(0, this.selectedIndex - 1);
  }

  slideRight() {
    this.selectedIndex = Math.min(this.tabs.length - 1, this.selectedIndex + 1);
  }
}
