import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-remarks-dialog',
  templateUrl: './remarks-dialog.component.html',
  styleUrls: ['./remarks-dialog.component.css']
})
export class RemarksDialogComponent implements OnInit {

  remarksForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<RemarksDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.remarksForm = this.formBuilder.group({
      remarks: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  onAddRemarks() {
    this.dialogRef.close(this.remarksForm.value);
  }

  close() {
    this.dialogRef.close();
  }
}
