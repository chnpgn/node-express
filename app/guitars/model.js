import mongoose from "mongoose";

const guitarSchema = new mongoose.Schema({
  make: String,
  model: String,
  make_lower: String,
});

const Guitar = mongoose.model("Guitar", guitarSchema);

export const getAllGuitars = async () => {
  return await Guitar.find();
};

export const getGuitarById = async (id) => {
  return await Guitar.findById(id);
};

export const getGuitarsByMake = async (make) => {
  return await Guitar.find({ make_lower: make.toLowerCase() });
};

export const addGuitar = async ({ make, model }) => {
  await Guitar.create({
    make,
    model,
    make_lower: make.toLowerCase(),
  });
};

export const updateGuitar = async (id, { make, model }) => {
  const guitar = await getGuitarById(id);

  if (guitar) {
    guitar.make = make;
    guitar.model = model;
    guitar.make_lower = make.toLowerCase();

    guitar.save();
  }
};

export const removeGuitar = async (id) => {
  await Guitar.deleteOne({ _id: id });
};
