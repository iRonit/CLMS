import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarksDialogComponent } from './remarks-dialog.component';

describe('RemarksDialogComponent', () => {
  let component: RemarksDialogComponent;
  let fixture: ComponentFixture<RemarksDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemarksDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemarksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
