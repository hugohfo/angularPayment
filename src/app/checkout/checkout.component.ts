import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  @Output() cardTypeChange = new EventEmitter<string>();
  checkoutForm!: FormGroup;
  cardType: string = '';
  isLoading = false;
 
  installmentOptions!: number[];
  constructor( 
    private formBuilder: FormBuilder,
    private checkoutService: CheckoutService
    ) {
    this.installmentOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      creditCard: this.formBuilder.group({
        cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{16}$/), this.cardNumberValidator]],
        cardHolderName: ['', Validators.required],
        expirationDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\d{2,4}$/)]],
        cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3}$/)]],
        installments: ['', [Validators.required, Validators.min(1)]],
        cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]] 

      })
    });
  }

  ngAfterViewInit(): void {
    this.detectChangeFormAndEmiterCardType();
  }

  submitForm(): void {
    this.isLoading = true;

  

    this.checkoutService.submitCheckoutForm(this.checkoutForm.value).subscribe(
      (response) => {
        this.loadFalseMock();
      },
      (error) => {
        this.loadFalseMock();
      }
    );


  }


  loadFalseMock(){
    setTimeout(() => {
      this.isLoading = false;
    }, 2000); 
  }

  detectChangeFormAndEmiterCardType() {
    this.checkoutForm.get('creditCard.cardNumber')?.valueChanges.subscribe(value => {
      if (value.startsWith('4')) {
        this.cardType = 'assets/img/logos/visa.png';
      } else if (value.startsWith('5')) {
        this.cardType = 'assets/img/logos/mastercard.png';
      } else {
        this.cardType = '';
      }
      this.cardTypeChange.emit(this.cardType);
    });
  }
  
  getFormattedValue(installments: number): string {
    const totalValue = 1198.8; // Valor total do produto
    const formattedValue = (totalValue / installments).toFixed(2);
    if (installments === 1) {
      return `${formattedValue} (à vista)`;
    } else {
      return `${formattedValue} (à prazo)`;
    }
  }

  cardNumberValidator(control: AbstractControl): {[key: string]: any} | null {
    const value = control.value;
    if (value && (value.startsWith('4') || value.startsWith('5'))) {
      return null; 
    } else {
      return {'cardNumberInvalid': true};  
    }
  }
  
} 
