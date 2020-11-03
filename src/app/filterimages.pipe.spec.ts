import { FilterimagesPipe } from "./filterimages.pipe";
import using from "jasmine-data-provider";

describe("FilterimagesPipe", () => {
  let pipe: FilterimagesPipe;

  const ImagesDetails = [
    { id: 1, brand: "perro", url: "assets/images/perro1.jpg" },
    { id: 2, brand: "perro", url: "assets/images/perro2.jpg" },
    { id: 3, brand: "gato", url: "assets/images/gato1.jpg" },
    { id: 4, brand: "gato", url: "assets/images/gato2.jpeg" },
    { id: 5, brand: "perro", url: "assets/images/perro3.jpg" },
  ];

  beforeEach(() => {
    pipe = new FilterimagesPipe();
  });

  it("Cuando se inicie el pipe, debe crear una instancia del filtro", () => {
    expect(pipe).toBeTruthy();
  });
  describe("transform", () => {
    using(
      [
        { laptop: "all", expected: ImagesDetails.length },
        { laptop: "perro", expected: 3 },
        { laptop: "gato", expected: 2 },
        { laptop: "loro", expected: 0 },
      ],
      (data) => {
        it(`Cuando llame el método 'transform', dada una lista y el laptop '${data.laptop}', debe retornar ${data.expected} elementos`, () => {
          const transformedList = pipe.transform(ImagesDetails, data.laptop);
          expect(transformedList.length).toEqual(data.expected);
        });
      }
    );
  });
});
