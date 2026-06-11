import {
  getAllGuitars,
  getGuitarById,
  getGuitarsByMake,
  addGuitar,
  updateGuitar,
  removeGuitar,
} from "./model.js";

export const showCreateForm = (req, res) => {
  res.render("guitars/form", {
    title: "Create Guitar",
    action: "/guitars",
    method: "POST",
  });
};

export const editGuitar = async (req, res) => {
  const id = req.params.id;
  console.log(`the retrieved id : ${id}`)
  if (!isIdValid(id)) {
    return res.status(400).json({ error: "Invalid guitar ID" });
  }
  const guitar = await getGuitarById(id);
  if (!guitar) {
    return res.status(404).json({ error: "Guitar not found" });
  }
  res.render("guitars/form", {
    title: "Edit Guitar",
    action: `/guitars/${id}`,
    method: "POST",  
    guitar: convertToObj(guitar),
  });
};

export const listGuitars = async (req, res) => {
  const guitars = await getAllGuitars();
  res.render("guitars/list", {
    guitars: guitars.map(convertToObj),
    title: "Guitar List",
  });
};

export const showGuitar = async (req, res) => {
  const id = req.params.id;

  if (isIdValid(id)) {
    const guitar = await getGuitarById(id);
    if (!guitar) {
      return res.status(404).json({ error: "Guitar not found" });
    } else {
      res.render("guitars/show", {
        guitar: convertToObj(guitar),
        title: `Guitar: ${guitar.make} ${guitar.model}`,
      });
    }
  } else {
    const found = await getGuitarsByMake(req.params.id);
    if (!found) {
      return res.status(404).json({ error: "Guitar not found" });
    } else {
      res.render("guitars/list", {
        guitars: found.map(convertToObj),
        title: `Guitars by Make: ${req.params.id}`,
      });
    }
  }
};

export const createGuitar = async (req, res) => {
  const { make, model } = req.body;
  if (!make || !model) {
    return res.status(400).json({ error: "Make and model are required" });
  } else if (typeof make !== "string" || typeof model !== "string") {
    return res.status(400).json({ error: "Make and model must be strings" });
  }
  // Here you would typically save the new guitar to your database
  await addGuitar({ make, model });
  res.redirect("/guitars");
};

export const saveGuitar = async (req, res) => {
  const id = req.params.id;
  if (!isIdValid(id)) {
    return res.status(400).json({ error: "Invalid guitar ID" });
  }
  const { make, model } = req.body;

  if (!make || !model) {
    return res.status(400).json({ error: "Make and model are required" });
  } else if (typeof make !== "string" || typeof model !== "string") {
    return res.status(400).json({ error: "Make and model must be strings" });
  }
  // Here you would typically save the updated guitar to your database
  await updateGuitar(id, { make, model });
  res.redirect(`/guitars/${id}`);
};

export const deleteGuitar = async (req, res) => {
  const id = req.params.id;

  if (!isIdValid(id)) {
    return res.status(400).json({ error: "Invalid guitar ID" });
  }
  // Here you would typically delete the guitar from your database
  await removeGuitar(id);
  res.redirect("/guitars");
};

const convertToObj = (g) => ({
  id: g._id,
  make: g.make,
  model: g.model,
});

const isIdValid = (id) => id.length === 24;
