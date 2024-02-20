import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Directive({
  selector: '[appProfilDirective]',
  standalone: true
})
export class ProfilDirectiveDirective {

  @Input() user: any;

  constructor(private el: ElementRef, private renderer: Renderer2,private auth : AuthService) {

  }

  ngOnChanges() {
    const backgroundImage = this.auth.myProfil.imgUrl
    this.renderer.setStyle(this.el.nativeElement.querySelector('.user:before'), 'background-image', backgroundImage);
  }

}
