import { TestBed } from '@angular/core/testing';

import { EnviarCancionService } from './enviar-cancion.service';

describe('EnviarCancionService', () => {
  let service: EnviarCancionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviarCancionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
