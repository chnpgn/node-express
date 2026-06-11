import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { routes as guitarRouter } from "./guitars/routes.js";
import { routes as authRouter } from "./auth/routes.js";
import session from "express-session";
import { create as createHandlebars } from "express-handlebars";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

await mongoose.connect(`mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@phriklasta.6sra03i.mongodb.net/`)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const hbs = createHandlebars({
  extname: ".hbs",
   helpers: {
      currentYear: () => new Date().getFullYear()
    },
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views/layouts"),
  partialsDir: path.join(__dirname, "views/partials")
});

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, "views"))

app.use(session({
  secret: "the-secret-key",
  resave: false,
  saveUninitialized: false
}));

app.use(express.static("./public/assets"));
app.use(express.urlencoded({ extended: false }));

// expose session user and helpers to all templates
app.use((req, res, next) => {
  res.locals.user = req.session?.user || null;
  next();
});

app.use("/", authRouter);
app.use("/guitars", guitarRouter);

app.get("/", (req, res) => {
  res.render('home')
});

export const start = () => {
  app.listen(8000, () => {
    console.log("Server is running at http://localhost:8000");
  });
};
