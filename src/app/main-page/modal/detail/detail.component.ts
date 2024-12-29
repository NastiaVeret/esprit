import { Component, OnInit, OnDestroy, NgZone, ChangeDetectorRef } from '@angular/core';
import { HeartDiseaseService } from '../../../heart-disease.service';
import { HeartDiseaseResponse } from '../../../main-page/main-page.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  heartDiseaseResponse: HeartDiseaseResponse = {
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

  private heartDiseaseResponseSubscription?: Subscription;

  constructor(
    public heartDiseaseService: HeartDiseaseService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.heartDiseaseResponseSubscription = this.heartDiseaseService.heartDiseaseResponse$.subscribe(
      (response) => {
        this.ngZone.run(() => {
          this.heartDiseaseResponse = response;
          console.log('Отримано відповідь:', this.heartDiseaseResponse);
          this.cdr.detectChanges(); 
        });
      },
      (error) => {
        console.error('Помилка при отриманні даних:', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.heartDiseaseResponseSubscription) {
      this.heartDiseaseResponseSubscription.unsubscribe();
    }
  }
}
