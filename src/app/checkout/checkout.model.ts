export interface CheckoutModel {
  creditCard: {
    cardNumber: string;
    cardHolderName: string;
    expirationDate: string;
    cvv: string;
    installments: number;
    cpf: string;
  };
}
