import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from './api.endpoints';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private _http: HttpClient) {}

  public getQuizById(quizId: string) {
    return this._http.get(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.QUIZ}/${quizId}`
    );
  }

  public getQuizzes(
    pageNumber: number = 0,
    pageSize: number = 10,
    sortBy: string = 'title',
    sortDir: string = 'asc'
  ) {
    return this._http.get(`
    ${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.QUIZ}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`);
  }

  public addQuiz(quiz: any) {
    return this._http.post(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.QUIZ}`,
      quiz
    );
  }

  public updateQuiz(quiz: any, quizId: string) {
    return this._http.put(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.QUIZ}/${quizId}`,
      quiz
    );
  }

  public deleteQuiz(quizId: string) {
    return this._http.delete(
      `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.QUIZ}/${quizId}`
    );
  }
}
