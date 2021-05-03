import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountHomePageComponent } from './account-home-page.component';

describe('AccountHomePageComponent', () => {
  let component: AccountHomePageComponent;
  let fixture: ComponentFixture<AccountHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
