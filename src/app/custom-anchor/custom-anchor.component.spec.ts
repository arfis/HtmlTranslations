import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAnchorComponent } from './custom-anchor.component';

describe('CustomAnchorComponent', () => {
  let component: CustomAnchorComponent;
  let fixture: ComponentFixture<CustomAnchorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomAnchorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAnchorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
