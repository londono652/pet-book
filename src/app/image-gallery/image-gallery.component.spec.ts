import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ImageService } from '../image.service';
import { FilterimagesPipe } from '../filterimages.pipe';
import { GalleryComponent } from './image-gallery.component';
import { By } from '@angular/platform-browser';
import { doesNotReject } from 'assert';
import { DebugElement } from '@angular/core';

describe('ImageGalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  let mockService : ImageService = new ImageService();
  let spy : any;
  let pipe = new FilterimagesPipe();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryComponent, FilterimagesPipe],
      providers:[
      {
        provide:ImageService,
        useValue:mockService
      }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    spy = spyOn(mockService, 'getImages').and.returnValues([    
      { "id": 1, "brand": "perro", "url": "assets/images/perro1.jpg" },    
      { "id": 2, "brand": "perro", "url": "assets/images/perro2.jpg" },
      { "id": 3, "brand": "gato", "url": "assets/images/gato1.jpg" },
      { "id": 4, "brand": "gato", "url": "assets/images/gato2.jpeg" },
      { "id": 5, "brand": "perro", "url": "assets/images/perro3.jpg" },
  ]);
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnChanges",() => {
    it('Cuando se cree el componente debe retornar todas las imágenes',() => {
        expect(component.allImages).toEqual([    
          { "id": 1, "brand": "perro", "url": "assets/images/perro1.jpg" },    
          { "id": 2, "brand": "perro", "url": "assets/images/perro2.jpg" },
          { "id": 3, "brand": "gato", "url": "assets/images/gato1.jpg" },
          { "id": 4, "brand": "gato", "url": "assets/images/gato2.jpeg" },
          { "id": 5, "brand": "perro", "url": "assets/images/perro3.jpg" },
      ]);
    });
  });

  describe('FilterimagesPipe', () =>{
    let pipe = new FilterimagesPipe();
    it('cuando se quiera filtrar todas las imágenes de la galería "filterBy=all" debe retornar un array de 5 posiciones con los JSON de las 5 imágenes', () => {
      expect(pipe.transform(component.allImages,"all")).toEqual([    
        { "id": 1, "brand": "perro", "url": "assets/images/perro1.jpg" },    
        { "id": 2, "brand": "perro", "url": "assets/images/perro2.jpg" },
        { "id": 3, "brand": "gato", "url": "assets/images/gato1.jpg" },
        { "id": 4, "brand": "gato", "url": "assets/images/gato2.jpeg" },
        { "id": 5, "brand": "perro", "url": "assets/images/perro3.jpg" },
      ]);
    });
    
    it('cuando se quiera filtrar las imágenes de perros de la galería "filterBy=perro" debe retornar un array de 3 posiciones con los JSON de las 3 imágenes de perros', () => {
      expect(pipe.transform(component.allImages,"perro")).toEqual([    
        { "id": 1, "brand": "perro", "url": "assets/images/perro1.jpg" },    
        { "id": 2, "brand": "perro", "url": "assets/images/perro2.jpg" },
        { "id": 5, "brand": "perro", "url": "assets/images/perro3.jpg" },
      ]);
    });
    
    it('cuando se quiera filtrar las imágenes de gatos de la galería "filterBy=gato" debe retornar un array de 2 posiciones con los JSON de las 2 imágenes de gatos', () => {
      expect(pipe.transform(component.allImages,"gato")).toEqual([    
        { "id": 3, "brand": "gato", "url": "assets/images/gato1.jpg" },
        { "id": 4, "brand": "gato", "url": "assets/images/gato2.jpeg" },
      ]);
    });
    
    it('cuando se quiera filtrar las imágenes con un filtro que no existe "filterBy=gato" debe retornar un array de 0 posiciones', () => {
      expect(pipe.transform(component.allImages,"gallina").length).toEqual(0);
    });

  });


  it("cuando se carga la vista, debe existir un elemento contenedor de imagenes con la clase img con las 5 imágenes", () => {
      
    fixture.detectChanges();
    let imageElements = fixture.debugElement.queryAll(By.css('img'));

    let images = imageElements.map(
      (debugElement:DebugElement) =>debugElement.nativeElement
    );
    expect(images.length).toEqual(5);
  });

  it("cuando se carga la vista, debe existir un elemento contenedor de los botones con clase button con los botones de filtros(All, Perro, Gato)", () =>{
    var filters = ['All','Perro','Gato'];
    fixture.detectChanges();
    var botones = fixture.debugElement.queryAll(By.css('button'));
    let boton = botones.map(
      (debugElement:DebugElement) => debugElement.nativeElement.innerHTML
    );

    for(var i in boton){
      expect(boton[i]).toEqual(filters[i]);
    }      
  });

  it('Cuando se de click en el botón "filterBy=all" se deben mostrar 5 imágenes en el contenedor de imágenes de clase img', fakeAsync(() =>{
    fixture.detectChanges();
    var buttons = fixture.debugElement.queryAll(By.css('button'));
    var button = buttons[0];
    button.triggerEventHandler('click',{});
    tick();
    fixture.detectChanges();
    let imageElements = fixture.debugElement.queryAll(By.css('img'));
    expect(imageElements.length).toEqual(5);
   
  }));


  it('Cuando se de click en el botón "filterBy=perro" se deben mostrar 3 imágenes en el contenedor de imágenes de clase img, correspondientes a las imágenes de perros', fakeAsync(() =>{
    fixture.detectChanges();
    var buttons = fixture.debugElement.queryAll(By.css('button'));
    var button = buttons[1];
    button.triggerEventHandler('click',{});
    tick();
    fixture.detectChanges();
    let imageElements = fixture.debugElement.queryAll(By.css('img'));
    expect(imageElements.length).toEqual(3);
  }));

  it('Cuando se de click en el botón "filterBy=gato" se deben mostrar 2 imágenes en el contenedor de imágenes de clase img, correspondientes a las imágenes de gatos', fakeAsync(() =>{
    fixture.detectChanges();
    var buttons = fixture.debugElement.queryAll(By.css('button'));
    var button = buttons[2];
    button.triggerEventHandler('click',{});
    tick();
    fixture.detectChanges();
    let imageElements = fixture.debugElement.queryAll(By.css('img'));
    expect(imageElements.length).toEqual(2);
  }));
});
