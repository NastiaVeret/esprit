import { Component, OnInit } from '@angular/core';
import { HeartDiseaseService } from '../../../heart-disease.service';
import { HeartDiseaseResponse } from '../../../main-page/main-page.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  // Default values for heartDiseaseResponse
  heartDiseaseResponse: HeartDiseaseResponse;

  constructor(private heartDiseaseService: HeartDiseaseService) {
    // Initialize the default value directly in the constructor
    this.heartDiseaseResponse = {
      prediction: [1],
      probabilities: {
        random_forest: 0,
        perceptron: 0,
        gaussian_nb: 0,
        xgboost: 0,
        lightgbm: 0
      },
      average_probability: 0
    };

    // Log the default value for debugging
    console.log("Default heartDiseaseResponse:", this.heartDiseaseResponse);
    this.ngOnInit()
  }

  ngOnInit(): void {
  setTimeout(() => {
    this.updateHeartDiseaseResponse({
      prediction: [0],
      probabilities: {
        random_forest: 80,
        perceptron: 75,
        gaussian_nb: 60,
        xgboost: 90,
        lightgbm: 85
      },
      average_probability: 78
    });
  }, 2000);  // Моделюємо затримку
}

  // A method to update the heartDiseaseResponse
  updateHeartDiseaseResponse(newData: HeartDiseaseResponse): void {
    // Reassign the object to trigger Angular's change detection
    this.heartDiseaseResponse = { ...newData };
    console.log("Updated heartDiseaseResponse:", this.heartDiseaseResponse);
  }
}
