import { AfterViewInit, Component, OnDestroy} from '@angular/core';
import { NgForOf, NgIf} from "@angular/common";
import { NzTabComponent, NzTabSetComponent} from "ng-zorro-antd/tabs";
import { TabOneComponent} from "../../tabs/tab-one/tab-one.component";
import { TabTwoComponent} from "../../tabs/tab-two/tab-two.component";
import { NavigationEnd, Router} from "@angular/router";
import { NzIconModule } from 'ng-zorro-antd/icon';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {TabThreeComponent} from "../../tabs/tab-three/tab-three.component";



const pulseAnimation = trigger('pulse', [
  state('highlighted', style({ opacity: 1, transform: 'scale(1.1)' })),
  state('resting', style({ opacity: 0, transform: 'scale(1)' })),
  transition('highlighted <=> resting', animate('2s ease-in-out')),
]);


@Component({
  animations: [pulseAnimation],
  selector: 'app-welcome',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NzTabComponent,
    NzTabSetComponent,
    TabOneComponent,
    TabTwoComponent,
    NzIconModule,
    TabThreeComponent,
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements AfterViewInit, OnDestroy {
  effect: string = `scrollx`
  tabs = [1, 2,3];
  selectedIndex = 0
  startX = 0
  private eventListeners: Map<String,(event: { key: string }) => void> = new Map<String, (event: {key: string}) => void>();
  constructor(private router: Router) {
  }

  ngOnDestroy(): void {
    this.removeEventListener();
  }

   // Store the event listener

  ngAfterViewInit() {
    let body = document.getElementsByTagName('body').item(0)
    let eventListener = (event: { key: string; }) => {
      console.log('clicked')
      if (event.key === 'ArrowLeft') {
        this.slideLeft();
      } else if (event.key === 'ArrowRight') {
        this.slideRight();
      }

    }
    this.eventListeners.set('keydown',eventListener)
    body.addEventListener('keydown', eventListener)
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.removeEventListener();
      }
    });
    let touchStart = (event) => {
      // Store initial touch coordinates
      this.startX = event.touches[0].clientX;
    }
    this.eventListeners.set('touchstart',touchStart)
    body.addEventListener('touchstart',touchStart );
    let touchEnd = (event) => {
      // Calculate swipe direction
      const endX = event.changedTouches[0].clientX;
      const swipeDirection = endX - this.startX > 0 ? 'left' : 'right';

      if (swipeDirection === 'left') {
        this.slideRight();
      } else if (swipeDirection === 'right') {
        this.slideLeft();
      }
    }
    this.eventListeners.set('touchend',touchEnd)
    body.addEventListener('touchend', touchEnd);
  }


  slideLeft() {
    this.selectedIndex = Math.max(0, this.selectedIndex - 1);
  }

  slideRight() {
    this.selectedIndex = Math.min(this.tabs.length - 1, this.selectedIndex + 1);
  }
  private removeEventListener() {
    for (let [key, value] of this.eventListeners.entries()) {
      if (value) {
        // @ts-ignore
        document.getElementsByTagName('body').item(0).removeEventListener(key as keyof HTMLBodyElementEventMap, value);
        value = null;
        this.eventListeners.delete(key)

      }
    }
  }
}
