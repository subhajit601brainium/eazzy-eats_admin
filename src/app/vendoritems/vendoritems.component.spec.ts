import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendoritemsComponent } from './vendoritems.component';

describe('VendoritemsComponent', () => {
  let component: VendoritemsComponent;
  let fixture: ComponentFixture<VendoritemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendoritemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendoritemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
