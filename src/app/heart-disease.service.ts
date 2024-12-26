import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeartDiseaseResponse } from '../app/main-page/main-page.component';

@Injectable({
  providedIn: 'root'
})

export class HeartDiseaseService {
  private heartDiseaseResponseSubject = new BehaviorSubject<HeartDiseaseResponse>({
    prediction: [1],
    probabilities: {
      random_forest: 0,
      perceptron: 0,
      gaussian_nb: 0,
      xgboost: 0,
      lightgbm: 0
    },
    average_probability: 0
  });

  heartDiseaseResponse$ = this.heartDiseaseResponseSubject.asObservable();

  setHeartDiseaseResponse(response: HeartDiseaseResponse) {
    this.heartDiseaseResponseSubject.next(response);
    console.log("Setting response:", response); 
  }

  getHeartDiseaseResponse() {
    console.log("lalala", this.heartDiseaseResponseSubject.value)
    return this.heartDiseaseResponseSubject.value;
  }
}