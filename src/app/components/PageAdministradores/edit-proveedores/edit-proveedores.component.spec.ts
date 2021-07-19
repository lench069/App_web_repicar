import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProveedoresComponent } from './edit-proveedores.component';

describe('EditProveedoresComponent', () => {
  let component: EditProveedoresComponent;
  let fixture: ComponentFixture<EditProveedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
