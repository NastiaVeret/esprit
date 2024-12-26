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
    restingECG: number;
    maxHR: number;
    exerciseAngina: boolean | null;
    oldpeak: number;
  } = {
    sex: null,
    chestPainType: null,
    fastingBS: null,
    exerciseAngina: null
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
  openModal(modalTemplate: TemplateRef<any>) {
    this.modalService.open(modalTemplate, { size: 'lg', title: ' ' }).subscribe((action) => {
      console.log('modalAction', action);
    });
  }

  // onSubmit(modalTemplate: TemplateRef<any>, modalTemplate1: TemplateRef<any>, modalTemplate2: TemplateRef<any>) {
  //   const transformedData = {
  //     age: Number(this.formData.age),
  //     sex: this.formData.sex,  
  //     chestPainType: Number(this.formData.chestPainType),
  //     restingBP: Number(this.formData.restingBP),
  //     cholesterol: Number(this.formData.cholesterol),
  //     fastingBS: Number(this.formData.fastingBS),
  //     restingECG: Number(this.formData.restingECG),
  //     maxHR: Number(this.formData.maxHR),
  //     exerciseAngina: this.formData.exerciseAngina === true,
  //     oldpeak: Number(this.formData.oldpeak)
  //   };

  //   console.log(transformedData);

  //   this.http.post<HeartDiseaseResponse>('https://localhost:7133/api/HeartDisease', transformedData)
  //     .subscribe(
  //       (response) => {
  //         if (+response.average_probability <= 33) { 
  //           this.openModal(modalTemplate); 
  //         } else if (+response.average_probability > 33 && +response.average_probability < 66) {
  //           this.openModal(modalTemplate2);
  //         } else {
  //           this.openModal(modalTemplate1);
  //         }
  //       },
  //       (error) => {
  //         console.error('Помилка при відправці:', error);
  //       }
  //     );
  // }

  onSubmit(modalTemplate: TemplateRef<any>, modalTemplate1: TemplateRef<any>, modalTemplate2: TemplateRef<any>) {
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
  
    // Simulate a delay for the fake response (like an HTTP request)
    setTimeout(() => {
      // Fake response object
      const fakeResponse: HeartDiseaseResponse = {
        prediction: [1], // Example prediction, could be 1 (disease) or 0 (no disease)
        probabilities: {
          random_forest: 0.5,
          perceptron: 0.7,
          gaussian_nb: 0.3,
          xgboost: 0.6,
          lightgbm: 0.8
        },
        average_probability: 45 // Average probability value between 0 and 100
      };

      this.heartDiseaseService.setHeartDiseaseResponse(fakeResponse);
      
      console.log(fakeResponse)
      // Simulate the logic based on the average_probability
      if (+fakeResponse.average_probability <= 33) { 
        this.openModal(modalTemplate); 
      } else if (+fakeResponse.average_probability > 33 && +fakeResponse.average_probability < 66) {
        this.openModal(modalTemplate2);
      } else {
        this.openModal(modalTemplate1);
      }
  
    }, 1000); // Simulate a 1 second delay (you can adjust this as needed)
  }
  

}
