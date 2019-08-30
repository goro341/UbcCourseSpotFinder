import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSpinnerComponent } from './public-spinner.component';

describe('PublicSpinnerComponent', () => {
  let component: PublicSpinnerComponent;
  let fixture: ComponentFixture<PublicSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
