import { NgModule } from '../../node_modules/@angular/core';
import {
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatSortModule,
    MatGridListModule
} from '@angular/material';

@NgModule({
    imports: [
        MatInputModule,
        MatFormFieldModule,
        MatTableModule,
        MatCardModule,
        MatTabsModule,
        MatButtonModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMenuModule,
        MatSortModule,
        MatGridListModule
    ],
    exports: [
        MatInputModule,
        MatFormFieldModule,
        MatTableModule,
        MatCardModule,
        MatTabsModule,
        MatButtonModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMenuModule,
        MatSortModule,
        MatGridListModule
    ]
})
export class CustomMaterialModule { }