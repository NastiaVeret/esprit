import { TestBed } from '@angular/core/testing';

import { HeartDiseaseService } from './heart-disease.service';
import { HeartDiseaseResponse } from '../app/main-page/main-page.component';

describe('HeartDiseaseService', () => {
  let service: HeartDiseaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeartDiseaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
