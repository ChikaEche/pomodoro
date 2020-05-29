import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

const modules = [
  CommonModule,
  MatTabsModule,
  MatFormFieldModule,
  FormsModule,
  MatSlideToggleModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatRippleModule,
  ReactiveFormsModule,
  MatCardModule,
];

@NgModule({
  declarations: [LayoutComponent],
  imports: [...modules],
  exports: [...modules],
})
export class SharedModule {}
