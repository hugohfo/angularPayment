import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CheckoutService } from './checkout.service';
import { CheckoutModel } from './checkout.model';
import { environment } from '../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

describe('CheckoutService', () => {
  let service: CheckoutService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CheckoutService]
    });

    service = TestBed.inject(CheckoutService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Este teste verifica se o serviço está enviando a requisição POST corretamente ao método submitCheckoutForm.
  it('should submit the checkout form', () => {
     const mockCheckoutData: CheckoutModel = {
      creditCard: {
        cardNumber: '4111111111111111', 
        cardHolderName: 'Teste',
        expirationDate: '12/24', 
        cvv: '123', 
        installments: 1, 
        cpf: '000.000.000-00' 
      }
    };

    service.submitCheckoutForm(mockCheckoutData).subscribe(response => {
      expect(response).toBeTruthy();  // verifica se a resposta é válida
    });

    const req = httpMock.expectOne(`${environment.urlCheckout}payment`);  // espera que a requisição seja feita ao endpoint correto
    expect(req.request.method).toBe('POST');  // espera que o método da requisição seja POST

    req.flush({}); // Simula uma resposta bem-sucedida.
  });

  // Este teste verifica se o serviço processa o pagamento corretamente.
  it('should process the payment', done => {
    service.processPayment().subscribe(response => {
      expect(response).toBeTruthy();  // verifica se a resposta é válida
      expect(response.success).toBeTrue();  // verifica se o campo "success" da resposta é true
      done();
    });
  });

  // Este teste também verifica se o serviço processa o pagamento corretamente, mas com uma expectativa ligeiramente diferente.
  it('should process payment', (done: DoneFn) => {
    service.processPayment().subscribe(response => {
      expect(response).toEqual({ success: true });  // espera que a resposta seja um objeto com o campo "success" igual a true
      done();
    });
  });

  // Este teste verifica se o serviço trata corretamente um erro ao enviar o formulário de checkout.
  it('should throw an error when submitCheckoutForm fails', () => {
    const mockCheckoutData: CheckoutModel = {
      creditCard: {
        cardNumber: '4111111111111111',
        cardHolderName: 'Teste',
        expirationDate: '12/24',
        cvv: '123',
        installments: 1,
        cpf: '000.000.000-00'
      }
    };
  
    service.submitCheckoutForm(mockCheckoutData).subscribe(
      response => fail('should have failed with 500 status'),  // espera que a requisição falhe com o status 500
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(500);  // verifica se o status do erro é 500
      }
    );
  
    const req = httpMock.expectOne(`${environment.urlCheckout}payment`);
    expect(req.request.method).toBe('POST');
  
    req.flush('Error', { status: 500, statusText: 'Internal Server Error' });  // Simula uma resposta de erro do servidor
  });
  
});
