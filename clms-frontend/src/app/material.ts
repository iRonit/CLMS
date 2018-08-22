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
    MatGridListModule,
    MatDialogModule,
    MatPaginatorModule
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
        MatGridListModule,
        MatDialogModule,
        MatPaginatorModule
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
        MatGridListModule,
        MatDialogModule,
        MatPaginatorModule
    ]
})
export class CustomMaterialModule { }