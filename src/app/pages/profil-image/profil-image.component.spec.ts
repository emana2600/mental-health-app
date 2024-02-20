import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilImageComponent } from './profil-image.component';

describe('ProfilImageComponent', () => {
  let component: ProfilImageComponent;
  let fixture: ComponentFixture<ProfilImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
