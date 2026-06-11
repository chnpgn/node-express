const guitars = [
  { id: 1, make: "Fender", model: "Stratocaster" },
  { id: 2, make: "Gibson", model: "Les Paul" },
  { id: 3, make: "Fender", model: "GS Mini" },
  { id: 4, make: "Ibanez", model: "RG" },
];

export const getAllGuitars = () => {
  return Promise.resolve(guitars);
};

export const getGuitarById = (id) => {
  return Promise.resolve(guitars.find((g) => g.id === id));
};

export const getGuitarsByMake = (make) => {
  return Promise.resolve(guitars.filter((g) => g.make.toLowerCase() === make.toLowerCase()));
};

export const addGuitar = ({ make, model }) => {
  const newGuitar = {
    id: guitars.length + 1,
    make,
    model
  };
  guitars.push(newGuitar);
  return Promise.resolve(newGuitar);
}; 

export const updateGuitar = (id, { make, model }) => {
  const guitarIndex = guitars.findIndex((g) => g.id === id);
  
  guitars[guitarIndex] = { ...guitars[guitarIndex], make, model };
  return Promise.resolve(true);
};

export const removeGuitar = (id) => {
  const guitarIndex = guitars.findIndex((g) => g.id === id);
  
  guitars.splice(guitarIndex, 1);
  return Promise.resolve(true );
};