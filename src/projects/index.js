import express from "express";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import uniqid from "uniqid";
import { check, validationResult } from "express-validator";
const router = express.Router();

const thisFilePath = fileURLToPath(import.meta.url);
const __dirname = dirname(thisFilePath);

const getFile = () => {
  const buf = fs.readFileSync(join(__dirname, "projects.json"));
  return JSON.parse(buf.toString());
};

router.get("/", (req, res, next) => {
  try {
    const projectDataBase = getFile(); //RUNS FUNCTION TO GET DATABASE
    if (projectDataBase.length > 0) {
      res.status(201).send(projectDataBase); //SENDS RESPONSE WITH GOOD CODE AND WHOLE DATABSE
    } else {
      const err = {};
      err.httpStatusCode = 404;
      next(err);
    }
  } catch (err) {
    err.httpStatusCode = 404;
    next(err);
  }
});

router.get("/:id", (req, res, next) => {
  try {
    const projectDataBase = getFile(); //RUNS FUNCTION TO GET DATABASE
    const singleProject = projectDataBase.filter(
      (project) => project.ID === req.params.id
    );
    if (singleProject.length > 0) {
      res.status(201).send(singleProject); //SENDS RESPONSE WITH GOOD CODE AND WHOLE DATABSE
    } else {
      const err = {};
      err.httpStatusCode = 404;
      next(err);
    }
  } catch (err) {
    err.httpStatusCode = 404;
    next(err);
  }
});

router.post(
  "/",
  [
    check("Name").exists().isLength({ min: 1 }).withMessage("Give it a name"),
    check("Description")
      .exists()
      .isLength({ min: 1 })
      .withMessage("Gimmie a description man"),
    check("RepoURL")
      .exists()
      .isLength({ min: 1 })
      .withMessage("You have to give a URL for the project repository"),
    check("LiveURL")
      .exists()
      .isLength({ min: 1 })
      .withMessage("You need to have a live demo of your project"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = {};
      err.message = errors;
      err.httpStatusCode = 400;
      next(err);
    } else {
      const projectDataBase = getFile(); //RUNS FUNCTION TO GET DATABASE
      const newProject = {
        ...req.body,
        ID: uniqid(),
        StudentID: uniqid(),
        createdAt: new Date(),
      };

      projectDataBase.push(newProject); //ADDS BODY TO DATABSE
      fs.writeFileSync(
        join(__dirname, "projects.json"),
        JSON.stringify(projectDataBase)
      ); //OVERWRITES OLD DATABASE WITH NEW DATABASE
      res.status(201).send(projectDataBase); //SENDS RESPONSE WITH GOOD CODE AND WHOLE DATABSE
    }
  }
);

router.put("/:id", (req, res, next) => {
  try {
    const projectDataBase = getFile(); //RUNS FUNCTION TO GET DATABASE
    const singleProject = projectDataBase.filter(
      (project) => project.ID === req.params.id
    );
    if (singleProject.length > 0) {
      const filteredDB = projectDataBase.filter(
        (project) => project.ID !== req.params.id
      );
      console.log(singleProject);
      const editedProject = {
        ...req.body,
        ID: singleProject[0].ID,
        StudentID: singleProject[0].StudentID,
        CreationDate: singleProject[0].CreationDate,
        ModifiedDate: new Date(),
      };
      filteredDB.push(editedProject);
      fs.writeFileSync(
        join(__dirname, "projects.json"),
        JSON.stringify(projectDataBase)
      );
      res.status(201).send(filteredDB); //SENDS RESPONSE WITH GOOD CODE AND WHOLE DATABSE
    } else {
      const err = {};
      err.httpStatusCode = 404;
      next(err);
    }
  } catch (err) {
    err.httpStatusCode = 404;
    next(err);
  }
});
router.delete("/:id", (req, res, next) => {
  try {
    const projectDataBase = getFile(); //RUNS FUNCTION TO GET DATABASE
    const filteredDB = projectDataBase.filter(
      (project) => project.ID !== req.params.id
    );

    fs.writeFileSync(
      join(__dirname, "projects.json"),
      JSON.stringify(filteredDB)
    );

    res.status(201).send(filteredDB); //SENDS RESPONSE WITH GOOD CODE AND WHOLE DATABSE
  } catch (err) {
    err.httpStatusCode = 404;
    next(err);
  }
});
router.delete("/:id", (req, res, next) => {});

export default router;
