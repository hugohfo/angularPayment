import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { CardComponent } from './card.component';
import { CardModule } from './card.module';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardModule],
      declarations: [CardComponent]
    }).compileComponents();

    formBuilder = new FormBuilder();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.checkoutForm = formBuilder.group({
      creditCard: formBuilder.group({
        cardNumber: [''],
        cardHolderName: [''],
        expirationDate: [''],
        cvv: ['']
      })
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
