import express from "express";
const router = express.Router();
export default router;

import { createUser, getUserByLogin } from "../db/queries/users.js";
import requireBody from "../middleware/requireBody.js";
import { createToken } from "../utils/jwt.js";

router.get("/", (req, res) => {
  res.send(`@Users`)
})

router.post("/register", requireBody(["username", "password"]), async(req, res) => {
  const { username, password } = req.body;
  const user = await createUser(username, password);
  const token = createToken({ id: user.id });
  res.status(201).send(token);
});

router.post("/login", requireBody(["username", "password"]), async(req, res) => {
  const { username, password } = req.body;
  const user = await getUserByLogin(username, password);
  if (!user) return res.status(401).send("Invalid username and/or password.");
  const token = createToken({ id: user.id });
  res.send(token);
});

