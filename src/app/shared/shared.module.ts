import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltersComponent } from './components/filters/filters.component';

@NgModule({
  declarations: [FiltersComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [FiltersComponent],
})
export class SharedModule {}
