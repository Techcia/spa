import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuDataComponent } from './menu-data/menu-data.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [MenuDataComponent, ProductComponent, CategoryComponent, SubCategoryComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatTreeModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  exports: [MenuDataComponent, ProductComponent]
})
export class FormModule { }
