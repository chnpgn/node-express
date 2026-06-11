import mongoose from "mongoose";
import dotenv from "dotenv";
import readline from "readline";
import { stdin as input, stdout as output } from "process";
import { hash } from "./app/auth/crypt.js";
import { User } from "./app/auth/model.js";

dotenv.config();

const rl = readline.createInterface({ input, output });

await mongoose.connect(
  `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@phriklasta.6sra03i.mongodb.net/`,
);

rl.question("Please enter your email address: ", (email) => {
  rl.question("Please enter a password: ", async (plaintext) => {
    const hashText = await hash(plaintext);

    await User.create({
      email: email.toLowerCase(),
      password: hashText,
    });
    rl.close(); 
  });
});
