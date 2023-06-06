import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CardModule } from '../card/card.module';
import { HeaderModule } from '../header/header.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CheckoutService } from './checkout.service';
import { HttpClientModule } from '@angular/common/http';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIcon, MatIconModule } from '@angular/material/icon';

export const maskConfig: Partial<IConfig> = {
  validation: false,
};


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ CheckoutComponent ],
  providers: [
    CheckoutService
    // other providers
  ],
  imports: [
    CommonModule,
    BrowserModule,
    CardModule,
    HeaderModule,
    ReactiveFormsModule ,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    NgxMaskModule.forRoot(maskConfig),
    MatGridListModule,
    FlexLayoutModule,
    HttpClientModule,
    MatStepperModule,
    MatIconModule
  ],
  exports: [ CheckoutComponent ]
})
export class CheckoutModule { }
