import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './components/filters/filters.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [FiltersComponent],
  imports: [CommonModule, MaterialModule],
  exports: [FiltersComponent],
})
export class SharedModule {}
