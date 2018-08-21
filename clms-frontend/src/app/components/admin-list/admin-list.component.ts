import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface PeriodicElement {
  sno: number;
  userId: string;
  name: string;
}

const ADMIN_DATA: PeriodicElement[] = [
  {sno: 1, userId: 'ronpradh', name: 'Ronit Pradhan'},
  {sno: 2, userId: 'roshetty', name: 'Rohan Shetty'},
];


@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit{

  displayedColumns: string[] = ['sno', 'userId', 'name'];
  dataSource = ADMIN_DATA;

  addAdmin: FormGroup;

  constructor(
    private formBuilder: FormBuilder) {
    this.addAdmin = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit(){
    const val = this.addAdmin.value;
    console.log("Leave applied successfully! :D");
    console.log("from: "+val.username);
  }  

}
