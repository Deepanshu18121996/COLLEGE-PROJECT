import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondbooksComponent } from './secondbooks.component';

describe('SecondbooksComponent', () => {
  let component: SecondbooksComponent;
  let fixture: ComponentFixture<SecondbooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondbooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
