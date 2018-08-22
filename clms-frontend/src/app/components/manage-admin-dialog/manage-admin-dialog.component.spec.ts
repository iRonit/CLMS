import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdminDialogComponent } from './manage-admin-dialog.component';

describe('ManageAdminDialogComponent', () => {
  let component: ManageAdminDialogComponent;
  let fixture: ComponentFixture<ManageAdminDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAdminDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAdminDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
