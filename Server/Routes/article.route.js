const router = require("express").Router()
const articleController = require("../Controllers/article.controller")
const uploadController = require("../Controllers/upload.controller")
const multer = require("multer")
const upload = multer()

router.get("/", articleController)
router.get("/", upload.single("file", articleController.createArticle))
router.get("/:id", articleController.updateArticle)
router.get("/:id", articleController.deleteArticle)
router.post("/upload-articlePic", uploadController.uploadArticlePic)
router.patch("/like-article/:id", articleController.likeArticle)
router.patch("/dislike-article/:id", articleController.dislikeArticle)
router.patch("/unlike-article/:id", articleController.unlikeArticle)
router.patch("/undislike-article/:id", articleController.undislikeArticle)

module.exports = router