import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagDetalleRecomendacionComponent } from './pag-detalle-recomendacion.component';

describe('PagDetalleRecomendacionComponent', () => {
  let component: PagDetalleRecomendacionComponent;
  let fixture: ComponentFixture<PagDetalleRecomendacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagDetalleRecomendacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagDetalleRecomendacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
