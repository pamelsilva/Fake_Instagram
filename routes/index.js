const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const postController = require("../controllers/postController");

const authMidleware = require("../middlewares/auth");
const uploads = require("../configs/uploads");

router.get("/", authController.create);

router.get("/login", authController.create);
router.post("/login", authController.store);

router.get("/registro", userController.create);
router.post("/registro", userController.store);

router.get("/publicar", authMidleware, postController.create);
router.post(
  "/publicar",
  authMidleware,
  uploads.single("photo"),
  postController.store
);

router.get("/home", authMidleware, postController.index);

module.exports = router;
