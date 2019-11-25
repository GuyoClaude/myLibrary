const express = require("express");
const Author = require("../models/author");
const router = express.Router();

//GET All authors Route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name != "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", { authors: authors, searchOptions: req.query });
  } catch (error) {
    res.redirect("/");
  }
});

//GET new author route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

//Create author route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name
  });
  try {
    const newAuthor = await author.save();
    //   res.redirect(`authors/${newAuthor.id}`)
    res.redirect(`authors`);
  } catch (error) {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating Author"
    });
  }
});
//Show Author Details
router.get("/:id", (req, res) => {
  res.send("Show Author" + req.params.id);
});

//Edit Author
router.get("/:id/edit", (req, res) => {
  res.send("Edit Author" + req.params.id);
});

//Update Author

router.put("/:id", (req, res) => {
  res.send("Update Author" + req.params.id);
});

//Delete Author
router.delete("/:id", (req, res) => {
  res.send("Delete Author" + req.params.id);
});

module.exports = router;
