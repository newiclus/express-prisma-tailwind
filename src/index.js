import express from "express";
import router from "./routes/index.js";
import Prisma from "@prisma/client";
const { PrismaClient } = Prisma;

const PORT = 5000;
const app = express();
const prisma = new PrismaClient();

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static("./public"));
app.use(router);

app.use(express.json());

app.post("/api/users", async (req, res) => {
  const { avatar, email, username, password } = req.body;

  const user = await prisma.user.create({
    data: {
      avatar,
      email,
      username,
      password,
    },
  });
  res.json(user);
});

app.get("/api/users", async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      avatar: true,
      email: true,
      username: true,
      password: false,
      createdAt: true,
    },
  });

  res.json(users);
});

app.get("/api/users/:username", async (req, res) => {
  const { username } = req.params;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      avatar: true,
      email: true,
      username: true,
      password: false,
      nfts: true,
      createdAt: true,
    },
  });

  res.json(user);
});

app.post("/api/nfts", async (req, res) => {
  const { name, description, imageUrl, price, ownerId } = req.body;

  const nft = await prisma.nft.create({
    data: {
      name,
      description,
      imageUrl,
      price,
      owner: { connect: { username: ownerId } },
    },
  });

  res.json(nft);
});

app.get("/api/nfts", async (req, res) => {
  const nfts = await prisma.nft.findMany();

  res.json(nfts);
});

app.get("/api/nfts/:id", async (req, res) => {
  const { id } = req.params;

  const nft = await prisma.nft.findUnique({
    where: {
      id: Number(id),
    },
  });

  res.json(nft);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
