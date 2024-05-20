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
        fileName = req.body._id + Date.now() + ".jpg"

        await pileline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/../client/public/uploads/articleImages/${fileName}`
            )
        )
    }

    const newArticle = new articleModel({
        picture: req.file != null ? "./uploads/articleImages" + fileName :"",
        name: req.body.name,
        typeArticle: req.body.typeArticle,
        groupe: req.body.groupe,
        price: req.body.price,
    })

    try {
        const article = newArticle.save()
        return res.Status(201).json(article)
    } catch (error) {
        return res.status(400).send(error)
    }
}

module.exports.updateArticle = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id inconnue:" + req.params.id)

    const updatedRecord = {
        picture: req.body.picture,
        name: req.body.name,
        typeArticle: req.body.typeArticle,
        groupe: req.body.groupe,
        price: req.body.price,
    }

    articleModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord}, 
        {new: true},
        (err,docs) => {
            if (!err) res.send(docs)
            else console.log("erreur d'update :" + err) 
        }
    )
}

module.exports.deleteArticle = (req,res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id inconnue :" + req.params.id) 

    articleModel.findByIdAndDelete(req.params.id, (err,docs) => {
        if (!err)res.send(docs)
        else console.log("Erreur lors de la supression :" + err)
    })
}