import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserTodoComponent } from './view-user-todo.component';

describe('ViewUserTodoComponent', () => {
  let component: ViewUserTodoComponent;
  let fixture: ComponentFixture<ViewUserTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewUserTodoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUserTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
