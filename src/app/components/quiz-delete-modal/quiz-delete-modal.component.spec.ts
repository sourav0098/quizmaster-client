import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizDeleteModalComponent } from './quiz-delete-modal.component';

describe('QuizDeleteModalComponent', () => {
  let component: QuizDeleteModalComponent;
  let fixture: ComponentFixture<QuizDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizDeleteModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
