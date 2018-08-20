import { NgModule } from '../../node_modules/@angular/core';
import {
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
} from '@angular/material';

@NgModule({
    imports: [
        MatInputModule,
        MatFormFieldModule,
        MatTableModule,
        MatCardModule,
        MatTabsModule,
        MatButtonModule
    ],
    exports: [
        MatInputModule,
        MatFormFieldModule,
        MatTableModule,
        MatCardModule,
        MatTabsModule,
        MatButtonModule
    ]
})
export class CustomMaterialModule { }