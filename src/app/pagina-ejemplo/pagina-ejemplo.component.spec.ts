import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaEjemploComponent } from './pagina-ejemplo.component';

describe('PaginaEjemploComponent', () => {
  let component: PaginaEjemploComponent;
  let fixture: ComponentFixture<PaginaEjemploComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaEjemploComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaEjemploComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
