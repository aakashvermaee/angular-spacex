import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { E404Component } from './components/error/e404/e404.component';
import { E500Component } from './components/error/e500/e500.component';
import { HomeComponent } from './components/home/home.component';
import { ProgramComponent } from './components/program/program.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { ProgramsWrapperComponent } from './components/programs-wrapper/programs-wrapper.component';

@NgModule({
  declarations: [E404Component, E500Component, HomeComponent, ProgramComponent, FooterComponent, ProgramsWrapperComponent],
  imports: [CommonModule, SharedModule],
  // exports: [E404Component, E500Component],
})
export class CoreModule {}
