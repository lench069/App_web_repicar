import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProveedoresComponent } from './admin-proveedores.component';

describe('AdminProveedoresComponent', () => {
  let component: AdminProveedoresComponent;
  let fixture: ComponentFixture<AdminProveedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
