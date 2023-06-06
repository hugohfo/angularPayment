import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { PipeModules } from '../shared/pipe/pipe.module';
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
  declarations: [ CardComponent ],
  imports: [
    CommonModule,
    PipeModules,
    MatStepperModule
  ],
  exports: [CardComponent]
})
export class CardModule { }
