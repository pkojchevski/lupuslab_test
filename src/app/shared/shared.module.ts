import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog'
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { GalleryComponent } from './gallery/gallery.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatSortModule} from "@angular/material/sort";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { InputFormComponent } from './input-form/input-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { DataPropertyGetterPipe } from './pipes/data-property-getter.pipe';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const components = [NavComponent, ConfirmDialogComponent, GalleryComponent, InputFormComponent, TableComponent]

const modules = [
  CommonModule,
  MatMenuModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatInputModule,
  MatListModule,
  MatIconModule,
  MatListModule,
  LayoutModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  RouterModule,
  ReactiveFormsModule
]

@NgModule({
  declarations: [...components, DataPropertyGetterPipe],
  imports: [
   ...modules
  ],
  exports:[...modules, ...components],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule { }
