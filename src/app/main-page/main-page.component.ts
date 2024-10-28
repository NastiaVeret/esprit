import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalService } from './modal/services/modal.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterModule],
  providers: [ModalService],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})

export class MainPageComponent {
  constructor(private modalService: ModalService) {}

  openModal(modalTemplate: TemplateRef<any>) {
    this.modalService
      .open(modalTemplate, { size: 'lg', title: ' ' })
      .subscribe((action) => {
        console.log('modalAction', action);
      });
  }
}
