import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent implements OnInit {

  applyLeave: FormGroup;

  constructor(
    private formBuilder: FormBuilder) {
    this.applyLeave = this.formBuilder.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      reason: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  onApply() {
    const val = this.applyLeave.value;
    console.log("Leave applied successfully! :D");
    console.log("from: "+val.from);
    console.log("to: "+val.to);
    console.log("reason: "+val.reason);

  }


}