import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesreqComponent } from './notesreq.component';

describe('NotesreqComponent', () => {
  let component: NotesreqComponent;
  let fixture: ComponentFixture<NotesreqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesreqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
