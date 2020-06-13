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
import { ChartsModule } from 'ng2-charts';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskDialogService } from '../core/services/task-dialog.service';
import { MinutesConverterPipe } from '../shared/pipes/minutes-converter.pipe';
import { SecondsConverterPipe } from 'src/app/shared/pipes/seconds-converter.pipe';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
  ChartsModule,
  MatDialogModule,
  MatSidenavModule,
  RouterModule,
  MatSnackBarModule,
];

const declarations = [
  MinutesConverterPipe,
  SecondsConverterPipe,
  LayoutComponent,
  FooterComponent,
];

@NgModule({
  declarations: [...declarations],
  imports: [...modules],
  exports: [...modules, ...declarations],
  providers: [TaskDialogService],
})
export class SharedModule {}
