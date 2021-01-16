import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboradShowComponent } from './dashborad-show.component';

describe('DashboradShowComponent', () => {
  let component: DashboradShowComponent;
  let fixture: ComponentFixture<DashboradShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboradShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboradShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
