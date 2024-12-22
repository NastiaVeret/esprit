import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicaltipsComponent } from './medicaltips.component';

describe('MedicaltipsComponent', () => {
  let component: MedicaltipsComponent;
  let fixture: ComponentFixture<MedicaltipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicaltipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicaltipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
