import express, { Express, NextFunction, Request, Response } from "express";

const app: Express = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  for (let param in req.query) {
    req.query[param] = (req.query[param] as string)
      .normalize()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, "");
  }
  next();
});

app.get("/user/:id", (req: Request, res: Response) => {
  let id: String = req.params.id;
  let name: String = req.query.name as string;
  let age: number = Number((req.query.age as string).replace(/[^0-9]/g, ""));

  let str: String = `id: ${id}, name: ${name}, age: ${age}`;
  res.send(str);
});

app.listen(3000, () => {
  console.log("app running!");
});
