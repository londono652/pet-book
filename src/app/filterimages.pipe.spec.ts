import { FilterimagesPipe } from './filterimages.pipe';

const Items = [    
  { "id": 1, "brand": "perro", "url": "assets/images/perro1.jpg" },    
  { "id": 2, "brand": "perro", "url": "assets/images/perro2.jpg" },
  { "id": 3, "brand": "gato", "url": "assets/images/gato1.jpg" },
  { "id": 4, "brand": "gato", "url": "assets/images/gato2.jpeg" },
  { "id": 5, "brand": "perro", "url": "assets/images/perro3.jpg" },
]  

describe('FilterimagesPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterimagesPipe();
    expect(pipe).toBeTruthy();
  });

  it('cuando seleccione el boton todos, debe mostrar todos los items', () => {
    const pipe = new FilterimagesPipe();

    pipe.transform(Items,'all');

    let resp= pipe.transform(Items,'all');

    expect(resp.length).toEqual(5);
  });

  it('cuando seleccione el boton Gatos, debe mostrar todos los Gatos', () => {
    const pipe = new FilterimagesPipe();

   let gatos= pipe.transform(Items,'gato');

    expect(gatos.length).toEqual(2);
  });

  it('cuando seleccione el boton Perros, debe mostrar todos los perros', () => {
    const pipe = new FilterimagesPipe();

    let perros= pipe.transform(Items,'perro');

    expect(perros.length).toEqual(3);
  });
  it('cuando cambien el nombre de los botones filtro, debe mostrar undefined o error', () => {
    const pipe = new FilterimagesPipe();

    let filtro= pipe.transform(Items,'perrox');

    expect(filtro).toBeUndefined;
  });
});
