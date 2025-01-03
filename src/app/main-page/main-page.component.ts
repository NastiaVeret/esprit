import { Component, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ModalService } from './modal/services/modal.service';
import { HeartDiseaseService } from '../heart-disease.service';

export interface HeartDiseaseResponse {
  prediction: number[];
  probabilities: {
    random_forest: number;
    perceptron: number;
    gaussian_nb: number;
    xgboost: number;
    lightgbm: number;
  };
  average_probability: number;
}

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  providers: [ModalService],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  formData: {
    age: number;
    sex: boolean | null;
    chestPainType: number | null;
    restingBP: number;
    cholesterol: number;
    fastingBS: number | null;
    restingECG: number | null;
    maxHR: number;
    exerciseAngina: boolean | null;
    oldpeak: number;
  } = {
    sex: null,
    chestPainType: null,
    fastingBS: null,
    exerciseAngina: null,
    restingECG: null
  } as any;

  constructor(
    private modalService: ModalService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private heartDiseaseService: HeartDiseaseService,
  ) {}

  onSexChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.formData.sex = selectElement.value === 'true' ? true : (selectElement.value === 'false' ? false : null);
  }

  onChestPainTypeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.formData.chestPainType = selectElement.value ? Number(selectElement.value) : null;
  }

  onFastingBSChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.formData.fastingBS = selectElement.value ? Number(selectElement.value) : null;
  }

  onExerciseAnginaChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.formData.exerciseAngina = selectElement.value ? Boolean(selectElement.value) : null;
  }
  onRestingECGChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.formData.restingECG = selectElement.value ? Number(selectElement.value) : null;
  }
  openModal(modalTemplate: TemplateRef<any>) {
    this.modalService.open(modalTemplate, { size: 'lg', title: ' ' }).subscribe((action) => {
      console.log('modalAction', action);
    });
  }

  onSubmit(modalTemplate: TemplateRef<any>, modalTemplate1: TemplateRef<any>, modalTemplate2: TemplateRef<any>) {
    if (this.formData.age < 0 || isNaN(Number(this.formData.age))) {
      alert("Вік не може бути від'ємним або містити літери.");
      return
    }
  
    if (this.formData.restingBP < 0 || isNaN(Number(this.formData.restingBP))) {
      alert("Артеріальний тиск не може бути від'ємним або містити літери.");
      return
    } 
    if (this.formData.cholesterol < 0 || isNaN(Number(this.formData.cholesterol))) {
      alert("Рівень холестерину не може бути від'ємним або містити літери.");
      return
    } 
    if (this.formData.maxHR < 0 || isNaN(Number(this.formData.maxHR))) {
      alert("Серцеві скорочення не можуть бути від'ємним або містити літери.");
      return
    } 
    if (this.formData.oldpeak < 0 || isNaN(Number(this.formData.oldpeak))) {
      alert("Не може бути від'ємним або містити літери.");
      return
    } 
    const transformedData = {
      age: Number(this.formData.age),
      sex: this.formData.sex,
      chestPainType: Number(this.formData.chestPainType),
      restingBP: Number(this.formData.restingBP),
      cholesterol: Number(this.formData.cholesterol),
      fastingBS: Number(this.formData.fastingBS),
      restingECG: Number(this.formData.restingECG),
      maxHR: Number(this.formData.maxHR),
      exerciseAngina: this.formData.exerciseAngina === true,
      oldpeak: Number(this.formData.oldpeak)
    };
  
    console.log(transformedData);
  
    this.http.post<HeartDiseaseResponse>('https://localhost:7133/api/HeartDisease', transformedData)
      .subscribe(
        (response) => {
          this.heartDiseaseService.setHeartDiseaseResponse(response);
  
          const averageProbability = response.average_probability;
  
          if (averageProbability <= 33) {
            this.openModal(modalTemplate);  
          } else if (averageProbability > 33 && averageProbability < 66) {
            this.openModal(modalTemplate2);  
          } else {
            this.openModal(modalTemplate1); 
          }
        },
        (error) => {
          console.error('Помилка при відправці:', error);
        }
      );
  }
  
}
