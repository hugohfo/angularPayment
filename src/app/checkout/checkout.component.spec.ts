import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { of } from 'rxjs';
import { CheckoutComponent } from './checkout.component';
import { CheckoutModule } from './checkout.module';
import { CheckoutService } from './checkout.service';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let mockCheckoutService: CheckoutService;
  
const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
      validation: false,
  };
};

  beforeEach(async () => {
    mockCheckoutService = jasmine.createSpyObj(['submitCheckoutForm']);

    await TestBed.configureTestingModule({
      imports: [
        CheckoutModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxMaskModule.forRoot(maskConfigFunction),
      ],
      providers: [{ provide: CheckoutService, useValue: mockCheckoutService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   // Este teste verifica se o componente é criado corretamente.
   it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Este teste verifica se o método 'submitForm' está chamando o método 'submitCheckoutForm' do serviço com os dados corretos.
  it('should submit form when submitForm is called', () => {
    const mockFormValue = {
      creditCard: {
        cardNumber: '4123456789123456',
        cardHolderName: 'Test User',
        expirationDate: '1126',
        cvv: '123',
        installments: 12,
        cpf: '11122233344'
      }
    };
    component.checkoutForm.setValue(mockFormValue);
    (mockCheckoutService.submitCheckoutForm as jasmine.Spy).and.returnValue(of({}));

    component.submitForm();

    expect(mockCheckoutService.submitCheckoutForm).toHaveBeenCalledWith(mockFormValue);
  });

  // Este teste verifica se a variável 'cardType' muda corretamente quando o número do cartão muda.
  it('should change card type when card number changes', () => {
    const cardNumberControl = component.checkoutForm.get('creditCard.cardNumber');

    cardNumberControl?.setValue('4123456789123456');
    expect(component.cardType).toEqual('assets/img/logos/visa.png');

    cardNumberControl?.setValue('5123456789123456');
    expect(component.cardType).toEqual('assets/img/logos/mastercard.png');

    cardNumberControl?.setValue('123456789123456');
    expect(component.cardType).toEqual('');
  });

  // Este teste verifica se a variável 'isLoading' é atualizada corretamente ao chamar 'submitForm'.
  it('should toggle isLoading state when submitForm is called', () => {
    const mockFormValue = {
      creditCard: {
        cardNumber: '4123456789123456',
        cardHolderName: 'Test User',
        expirationDate: '1126',
        cvv: '123',
        installments: 12,
        cpf: '11122233344'
      }
    };
    component.checkoutForm.setValue(mockFormValue);
    (mockCheckoutService.submitCheckoutForm as jasmine.Spy).and.returnValue(of({}));

    component.submitForm();

    expect(component.isLoading).toBe(true);
  });

  // Este teste verifica se o evento 'cardTypeChange' emite o valor correto quando o número do cartão muda.
  it('should emit the correct card type when card number changes', () => {
    const cardNumberControl = component.checkoutForm.get('creditCard.cardNumber');
    spyOn(component.cardTypeChange, 'emit');

    cardNumberControl?.setValue('4123456789123456');
    expect(component.cardTypeChange.emit).toHaveBeenCalledWith('assets/img/logos/visa.png');

    cardNumberControl?.setValue('5123456789123456');
    expect(component.cardTypeChange.emit).toHaveBeenCalledWith('assets/img/logos/mastercard.png');

    cardNumberControl?.setValue('123456789123456');
    expect(component.cardTypeChange.emit).toHaveBeenCalledWith('');
  });

  // Este teste verifica se o método 'getFormattedValue' retorna o valor formatado correto.
  it('should return the correct formatted value when getFormattedValue is called', () => {
    expect(component.getFormattedValue(1)).toEqual('1198.80 (à vista)');
    expect(component.getFormattedValue(2)).toEqual('599.40 (à prazo)');
    expect(component.getFormattedValue(12)).toEqual('99.90 (à prazo)');
  });

});
