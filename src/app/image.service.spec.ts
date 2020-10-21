import { TestBed } from '@angular/core/testing';

import { ImageService } from './image.service';

describe('ImageService', () => {
  let service: ImageService;

  beforeEach(() => {
    service = new ImageService();
  });

  describe('getImages', () => {
    it('cuando se llame el metodo, debe retornar todas las imagenes(5)', () => {
      let resp = service.getImages();
      expect(resp.length).toEqual(5);
    });
  });

  describe('getImage', () => {
    it('cuando se envie el id 3 que si esta dentro de la lista, debe retornar este elemento', () => {
      const id = 3;
      let resp = service.getImage(id);
      expect(resp.brand).toBe('gato');
      expect(resp.url).toBe('assets/images/gato1.jpg');

    });
    it('cuando se envie el id 7 que no esta dentro de la lista, debe retornar undefined', () => {
      const id = 7;
      let resp = service.getImage(id);
      expect(resp).toBeUndefined();      
    });
  });
});