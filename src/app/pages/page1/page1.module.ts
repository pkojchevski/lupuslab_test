import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { Page1RoutingModule } from './page1.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { Page1Component } from './page1.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditPostDialogComponent } from './edit-post-dialog/edit-post-dialog.component';




@NgModule({
  declarations: [
    Page1Component,
    EditPostDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    Page1RoutingModule,
    HttpClientModule
  ]
})
export class Page1Module { }
