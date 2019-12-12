import { NgModule } from '@angular/core';

import { VerticalLayout1Module } from 'app/shared/layout/vertical/layout-1/layout-1.module';
import { VerticalLayout2Module } from 'app/shared/layout/vertical/layout-2/layout-2.module';
import { VerticalLayout3Module } from 'app/shared/layout/vertical/layout-3/layout-3.module';

import { HorizontalLayout1Module } from 'app/shared/layout/horizontal/layout-1/layout-1.module';
import { FormModule } from './forms/form.module';

@NgModule({
    imports: [
        VerticalLayout1Module,
        VerticalLayout2Module,
        VerticalLayout3Module,
        HorizontalLayout1Module,
        FormModule,
    ],
    exports: [
        VerticalLayout1Module,
        VerticalLayout2Module,
        VerticalLayout3Module,
        HorizontalLayout1Module,
        FormModule
    ],
    declarations: []
})
export class LayoutModule
{
}
