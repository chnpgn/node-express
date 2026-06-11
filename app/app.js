import express from "express";
import { routes as guitarRouter } from "./guitars/routes.js";

const app = express();

app.use(express.static("./public/assets"));
app.use(express.urlencoded({ extended: false }));

app.use("/guitars", guitarRouter);

app.get("/", (req, res) => {
  res.send("Good afternoon, everyone! I am a Node.js server running with Express. Welcome to my website!");
});

export const start = () => {
  app.listen(8000, () => {
    console.log("Server is running at http://localhost:8000");
  });
};
