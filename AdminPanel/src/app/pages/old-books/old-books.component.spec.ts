import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldBooksComponent } from './old-books.component';

describe('OldBooksComponent', () => {
  let component: OldBooksComponent;
  let fixture: ComponentFixture<OldBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
