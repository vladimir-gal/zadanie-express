import express from "express";

const app = express();

app.use((req, res, next) => {
  Object.entries(req.query).forEach(([key, value]) => {
    req.query[key] = String(value)
      .normalize()
      .toLowerCase()
      .replace(/[^\x00-\x7F]/g, "");
  });
  next();
});

app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const { name, age } = req.query;

  if(typeof name !== "string" || typeof age !== "string") {
    res.status(400).send("Invalid query parameters");
    return;
  }

  res.send({
    id,
    name,
    age: Number(age?.replace(/[^0-9]/g, ""))
  });
});

app.listen(3000, () => {
  console.log("app running!");
});
