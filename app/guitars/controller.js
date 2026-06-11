import {
  getAllGuitars,
  getGuitarById,
  getGuitarsByMake,
  addGuitar,
  updateGuitar,
  removeGuitar,
} from "./model.js";
import { view } from "./view.js";

export const showCreateForm = (req, res) => {
  res.send(
    view("form", {
      title: "Create Guitar",
      action: "/guitars",
      method: "POST",
    }),
  );
};

export const editGuitar = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid guitar ID" });
  }
  const guitar = await getGuitarById(id);
  if (!guitar) {
    return res.status(404).json({ error: "Guitar not found" });
  }
  res.send(
    view("form", {
      title: "Edit Guitar",
      action: `/guitars/${id}`,
      method: "POST",
      guitar,
    }),
  );
};

export const listGuitars = async (req, res) => {
  const guitars = await getAllGuitars();
  res.send(view("list", { guitars, title: "Guitar List" }));
};

export const showGuitar = async (req, res) => {
  const id = parseInt(req.params.id);
  
  if (id) {
    const guitar = await getGuitarById(id);
    if (!guitar) {
      return res.status(404).json({ error: "Guitar not found" });
    } else {
      return res.send(view("show", { guitar }));
    }
  } else {
    const found = await getGuitarsByMake(req.params.id);
    if (!found) {
      return res.status(404).json({ error: "Guitar not found" });
    } else {
      return res.send(
        view("list", {
          guitars: found,
          title: `Guitars by Make: ${req.params.id}`,
        }),
      );
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
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
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
  const id = parseInt(req.params.id);

  if(isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid guitar ID" });
  }
  // Here you would typically delete the guitar from your database
  await removeGuitar(id);
  res.redirect("/guitars");
};
