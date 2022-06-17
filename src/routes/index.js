import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Home", message: "Hello there!" });
});

router.get("/users", (req, res) => {
  res.render("users", { title: "Users", message: "Users" });
});

export default router;
