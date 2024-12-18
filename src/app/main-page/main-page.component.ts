import { Component, TemplateRef, ChangeDetectorRef  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ModalService } from './modal/services/modal.service';

interface HeartDiseaseResponse {
  prediction: number[];
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
    sex: boolean;
    chestPainType: number;
    restingBP: number;
    cholesterol: number;
    fastingBS: number;
    restingECG: number;
    maxHR: number;
    exerciseAngina: boolean;
    oldpeak: number;
  } = {} as any;

  constructor(
    private modalService: ModalService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  openModal(modalTemplate: TemplateRef<any>) {
    this.modalService
      .open(modalTemplate, { size: 'lg', title: ' ' })
      .subscribe((action) => {
        console.log('modalAction', action);
      });
  }

  onSubmit(modalTemplate: TemplateRef<any>, modalTemplate1: TemplateRef<any>) {
    const transformedData = {
      age: Number(this.formData.age),
      sex: Number(this.formData.sex) == 1 ? true : false,
      chestPainType: Number(this.formData.chestPainType),
      restingBP: Number(this.formData.restingBP),
      cholesterol: Number(this.formData.cholesterol),
      fastingBS: Number(this.formData.fastingBS),
      restingECG: Number(this.formData.restingECG),
      maxHR: Number(this.formData.maxHR),
      exerciseAngina: Number(this.formData.exerciseAngina) == 1 ? true : false,
      oldpeak: Number(this.formData.oldpeak)
    };

    this.http.post<HeartDiseaseResponse>('https://localhost:7133/api/HeartDisease', transformedData)
      .subscribe(
        (response) => {
          if (response.prediction && response.prediction[0] === 0) {
            this.openModal(modalTemplate);
          } else{
            this.openModal(modalTemplate1);
          }
        },
        (error) => {
          console.error('Помилка при відправці:', error);
        }
      );




    // Фейкова відповідь для тестування
    // const fakeResponse = { prediction: [Math.round(Math.random())] };
    // this.showPredictionModal(fakeResponse.prediction[0], modalTemplate, modalTemplate1);

  }

  // showPredictionModal(prediction: number, modalTemplate: TemplateRef<any>, modalTemplate1: TemplateRef<any>) {
  //   if (prediction === 0) {
  //     this.openModal(modalTemplate);
  //   } else {
  //     this.openModal(modalTemplate1);
  //   }
  // }


  }
