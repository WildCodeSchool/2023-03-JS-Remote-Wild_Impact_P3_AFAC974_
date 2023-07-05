const express = require("express");

const router = express.Router();

// const itemControllers = require("./controllers/itemControllers");

// router.get("/items", itemControllers.browse);
// router.get("/items/:id", itemControllers.read);
// router.put("/items/:id", itemControllers.edit);
// router.post("/items", itemControllers.add);
// router.delete("/items/:id", itemControllers.destroy);

const workControllers = require("./controllers/workControllers");

router.get("/works", workControllers.browse);
router.get("/works/:id", workControllers.read);
router.put("/works/:id", workControllers.edit);
router.post("/works", workControllers.add);
router.delete("/works/:id", workControllers.destroy);

const categoryControllers = require("./controllers/categoryControllers");

router.get("/categories", categoryControllers.browse);
router.get("/categories/:id", categoryControllers.read);
router.post("/categories", categoryControllers.add);
router.put("/categories/:id", categoryControllers.edit);
router.delete("/categories/:id", categoryControllers.destroy);

const techniqueControllers = require("./controllers/techniqueControllers");

router.get("/techniques", techniqueControllers.browse);
router.get("/techniques/:id", techniqueControllers.read);
router.put("/techniques/:id", techniqueControllers.edit);
router.post("/techniques", techniqueControllers.add);
router.delete("/techniques/:id", techniqueControllers.destroy);

const articleControllers = require("./controllers/articleControllers");

router.get("/articles", articleControllers.browse);
router.get("/articles/:id", articleControllers.read);
router.put("/articles/:id", articleControllers.edit);
router.post("/articles", articleControllers.add);
router.delete("/articles/:id", articleControllers.destroy);

const AboutController = require("./controllers/AboutController");

router.get("/about", AboutController.browse);
router.get("/about/:id", AboutController.read);
router.put("/about/:id", AboutController.edit);
router.post("/about", AboutController.add);
router.delete("/about/:id", AboutController.destroy);


module.exports = router;
