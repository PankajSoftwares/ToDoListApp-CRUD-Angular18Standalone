import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserTodoComponent } from './add-user-todo.component';

describe('AddUserTodoComponent', () => {
  let component: AddUserTodoComponent;
  let fixture: ComponentFixture<AddUserTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserTodoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
