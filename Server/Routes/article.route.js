const router = require("express").Router()
const articleController = require("../Controllers/article.controller")
const multer = require("multer")
const upload = multer()

router.get("/", articleController)
router.get("/", upload.single("file", articleController.createArticle))
router.get("/:id", articleController.updateArticle)
router.get("/:id", articleController.deleteArticle)

module.exports = router