import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { DetailComponent } from '../detail/detail.component'; 
import { Router } from '@angular/router';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})

export class ModalComponent {

  @Input() size? = 'md';
  @Input() title? = 'Modal title';

  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();

  private dynamicComponentRef?: ComponentRef<DetailComponent>;

  constructor(
    private elementRef: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router
  ) {}

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef })
  dynamicComponentContainer!: ViewContainerRef;

  close(): void {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

  submit(): void {
    this.elementRef.nativeElement.remove();
    this.submitEvent.emit();
  }

  newModalOpen = false; 

  openNewModal() {
    this.newModalOpen = true;
  }

  closeNewModal() {
    this.newModalOpen = false;
  }

  loadOtherComponent() {
    if (this.dynamicComponentRef) {
      this.dynamicComponentRef.destroy();
      this.dynamicComponentRef = undefined;
    } else {
      this.dynamicComponentContainer.clear(); 
      const factory = this.componentFactoryResolver.resolveComponentFactory(DetailComponent);
      this.dynamicComponentRef = this.dynamicComponentContainer.createComponent(factory);
      this.dynamicComponentRef.instance.loadData();
    }
  }
  loadRecomendation() {
    this.close();
    this.router.navigate(['/tips']);
  }
}
