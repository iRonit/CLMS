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
    MatPaginatorModule,
    MatToolbarModule
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
        MatPaginatorModule,
        MatToolbarModule
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
        MatPaginatorModule,
        MatToolbarModule
    ]
})
export class CustomMaterialModule { }