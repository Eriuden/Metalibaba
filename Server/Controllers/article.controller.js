const articleModel = require("../Models/article.model")
const ObjectId = require("mongoose").Types.ObjectId
const fs = require("fs")
const {promisify} = require("util")
const {uploadErrors} = require("../utils/error.utils")
const pipeline = promisify(require("stream"))

module.exports.readArticle = (res) => {
    articleModel.find((err,docs) => {
        if (!err) res.send(docs)
        else console.log("Erreur de réception" + err) 
    }).sort ({createdAt: -1}) 
}

module.exports.createArticle = async (req, res) => {
    let fileName 

    if(req.file != null) {
        try {
            if (
                req.file.detectedMimeType != "image/jpg" &&
                req.file.detectedMimeType != "image/png" &&
                req.file.detectedMimeType != "image/jpeg" 
            )
            throw Error("Invalid file")

            if (req.file.size > 500000) throw Error ("Taille maximale dépassée")
        } catch (error) {
            const errors = uploadErrors(error)
            return res.status(201).json({errors})
        }
    }
}