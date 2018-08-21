import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserLeave } from '../../models/user-leave';

@Component({
  selector: 'apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent implements OnInit {

  applyLeaveForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
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
    const val = this.applyLeaveForm.value;
    console.log("Leave applied successfully! :D\nval = " + JSON.stringify(val));

    let userLeave: UserLeave = {} as any;
    userLeave.fromDate = this.convert(val.from);
    userLeave.toDate = this.convert(val.to);
    userLeave.reason = val.reason;

    this.userService.postUserLeave(userLeave)
      .subscribe( res => {
        this.applyLeaveForm.reset();
      });
  }

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }


}