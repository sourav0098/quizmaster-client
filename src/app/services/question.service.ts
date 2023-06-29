import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from './api.endpoints';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private _http: HttpClient) {}

  public getQuestionById(questionId: string) {
    return this._http.get(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.QUESTION}/${questionId}`
    );
  }

  public getQuestionbyQuiz(
    quizId: string,
    pageNumber: number = 0,
    pageSize: number = 10
  ) {
    return this._http.get(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.QUESTION}/quiz/${quizId}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  public addQuestion(question: any) {
    return this._http.post(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.QUESTION}`,
      question
    );
  }

  public updateQuestion(question: any, questionId: string) {
    return this._http.put(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.QUESTION}/${questionId}`,
      question
    );
  }

  public deleteQuestion(questionId: string) {
    return this._http.delete(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.QUESTION}/${questionId}`
    );
  }
}
