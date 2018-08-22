import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'apply-leave',
  templateUrl: './apply-leave-dialog.component.html',
  styleUrls: ['./apply-leave-dialog.component.css']
})
export class ApplyLeaveDialogComponent implements OnInit {

  applyLeaveForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ApplyLeaveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.applyLeaveForm = this.formBuilder.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      reason: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  onApply() {
    this.dialogRef.close(this.applyLeaveForm.value);
  }

  close() {
    this.dialogRef.close();
  }
  
}