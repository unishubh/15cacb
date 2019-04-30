import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFaqComponent } from './new-faq.component';

describe('NewFaqComponent', () => {
  let component: NewFaqComponent;
  let fixture: ComponentFixture<NewFaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
