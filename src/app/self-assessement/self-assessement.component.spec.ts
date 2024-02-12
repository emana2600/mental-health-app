import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfAssessementComponent } from './self-assessement.component';

describe('SelfAssessementComponent', () => {
  let component: SelfAssessementComponent;
  let fixture: ComponentFixture<SelfAssessementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelfAssessementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelfAssessementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
