import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Home", message: "Hello there!" });
});

router.get("/about", (req, res) => {
  res.render("about", { title: "About me!", message: "Bio!" });
});

export default router;
