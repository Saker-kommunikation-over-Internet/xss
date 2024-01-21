import express, { urlencoded } from "express";
import DOMPurify from "isomorphic-dompurify";
const app = express();

let guestbookEntries = []; // Simulerar vår databas.

app.set("view engine", "ejs");
app.use(urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.render("index", { entries: guestbookEntries });
});

app.post("/sign", (req, res) => {
  const dirtyEntry = req.body.entry;
  const cleanEntry = DOMPurify.sanitize(dirtyEntry) // Escapar all HTML.
  guestbookEntries.push(cleanEntry);
  res.redirect("/");
});

app.listen(8000, () => {
  console.log("Server is running at localhost:8000");
});
