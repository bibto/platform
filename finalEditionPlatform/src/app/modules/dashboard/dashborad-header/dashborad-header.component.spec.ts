import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboradHeaderComponent } from './dashborad-header.component';

describe('DashboradHeaderComponent', () => {
  let component: DashboradHeaderComponent;
  let fixture: ComponentFixture<DashboradHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboradHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboradHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
