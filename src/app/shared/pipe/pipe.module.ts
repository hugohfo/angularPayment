import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CardNumberPipe } from "./card-number.pipe";
import { ExpirationDatePipe } from "./expiration-date.pipe";


@NgModule({
  declarations: [
    ExpirationDatePipe,
    CardNumberPipe
  ],
  imports: [CommonModule],
  providers: [
    ExpirationDatePipe,
    CardNumberPipe
  ],
  exports: [
    ExpirationDatePipe,
    CardNumberPipe
  ],
})
export class PipeModules {}
