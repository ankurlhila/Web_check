import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudComponent } from './aud.component';

describe('AudComponent', () => {
  let component: AudComponent;
  let fixture: ComponentFixture<AudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AudComponent]
    });
    fixture = TestBed.createComponent(AudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
