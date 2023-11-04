import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductEditPageRoutingModule } from './product-edit-routing.module';

import { ProductEditPage } from './product-edit.page';
import { ReactiveFormsModule } from '@angular/forms'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductEditPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProductEditPage]
})
export class ProductEditPageModule {}
