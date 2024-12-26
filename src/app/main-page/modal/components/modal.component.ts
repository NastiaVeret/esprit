import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { DetailComponent } from '../detail/detail.component'; // Import the component to load

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

  // Store the reference to the dynamically created component
  private dynamicComponentRef?: ComponentRef<DetailComponent>;

  constructor(
    private elementRef: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver
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

  newModalOpen = false; // Track the state of the new modal

  openNewModal() {
    this.newModalOpen = true;
  }

  closeNewModal() {
    this.newModalOpen = false;
  }

  loadOtherComponent() {
    if (this.dynamicComponentRef) {
      // If the component is already loaded, destroy it (close it)
      this.dynamicComponentRef.destroy();
      this.dynamicComponentRef = undefined;
    } else {
      // If the component is not loaded, create it
      this.dynamicComponentContainer.clear(); // Clear the container
      const factory = this.componentFactoryResolver.resolveComponentFactory(DetailComponent);
      this.dynamicComponentRef = this.dynamicComponentContainer.createComponent(factory);
    }
  }
}
