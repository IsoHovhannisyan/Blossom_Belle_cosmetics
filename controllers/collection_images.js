const { prisma } = require("../prisma/prisma-client");
const multiparty = require("multiparty");
const fs = require("fs");
const Nfs = require('node:fs');
const path = require("path");
const { setTimeout } = require("timers/promises");


/**
 * @route GET api/collection_images/all
 * @desc Получение всех сотрудников
 * @access Private
 */

const all = async (req, res) => {
    const folder = req.query.folder || '';

    try {
        const collectionimages = await prisma.collectionimages.findMany(folder && {
            where: {
                folder,
            },
        });

        return res.status(200).json(collectionimages);
    } catch {
        return res.status(400).json({ message: "Failed to receive" });
    }
};


/**
 * 
 * @route POST api/collection_images/add
 * @desc Добавление сотрудника
 * @access Private
 */

const add = async (req, res) => {
    try {
        const folder = req.body.folder;
        const { image } = req.files;

        // Check if file exists
        if (!image || !folder) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Validate file type
        if (!/^image/.test(image.mimetype)) {
            return res.status(400).json({ message: 'Invalid image format' });
        }

        // Generate unique filename
        const fileName = `${Date.now()}_${image.name}`;
        const filePath = path.join('/tmp', fileName);

        // Write file to /tmp directory
        fs.writeFileSync(filePath, image.data);

        // Construct URL of uploaded file
        const fileUrl = `/images/${fileName}`;

        // Return URL in response
        const collectionimages = await prisma.collectionimages.create({
                        data: {
                            folder,
                            image_name: fileUrl,
                            authorId: req.user.id,
                        },
                    });
            
                    return res.status(201).json(collectionimages);
        // res.status(200).json({ message: "File uploaded successfully", imageUrl: fileUrl });
    } catch (err) {
        console.error("Error uploading file:", err);
        return res.status(500).json({ message: "Error uploading file" });
    }
};


/**
 * 
 * @route POST api/collection_images/remove/:id
 * @desc Удаление сотрудника
 * @access Private
 */

const remove = async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    if(!data.fileName){
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        await prisma.collectionimages.delete({
            where: {
                id,
            },
        });
        // fs.unlink(`./public/`+ data.fileName, (err) => {
        //     if (err) {
        //         return res.status(400).json({ message: "Failed to delete local image:" });
        //     }
        // });
        return res.status(200).json("OK");
    } catch(err) {
        return res.status(500).json({ message: "Failed to delete" });
    }
};

/**
 * 
 * @route PUT api/collection_images/edit/:id
 * @desc Редактирование сотрудника
 * @access Private
 */


const edit = async (req, res) => {
    const IMAGE_UPLOAD_DIR = "./public/images/";

    let form = new multiparty.Form();

    form.parse(req, async function (err, fields, files) {
        if (err) {
            return res.status(400).json({ message: "Failed to parse form data" });
        }

        if (!fields.folder || !files.image) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const data = fields;
        const id = req.params.id;
        let imageURL = data.image_name;
        const newImage = files.image && files.image[0];

        if (fields.folder && fields.folder[0]) {
            data.folder = fields.folder[0].toLowerCase();
        }

        if (newImage) {
            const folder = data.folder;
            const nameFolder = path.join(IMAGE_UPLOAD_DIR, folder);

            if (!fs.existsSync(nameFolder)) {
                fs.mkdirSync(nameFolder, { recursive: true });
            }

            const imagePath = newImage.path;
            const imageFileName = imagePath.slice(imagePath.lastIndexOf("\\") + 1);
            const updatedImageFileName = `${folder}_${Date.now()}_${imageFileName}`;
            const imageFullPath = path.join(nameFolder, updatedImageFileName);
            imageURL = path.join("/images", folder, updatedImageFileName).replace(/\\/g, '/');

            fs.rename(imagePath, imageFullPath, (err) => {
                if (err) {
                    return res.status(500).json({ message: "Failed to move the uploaded file" });
                }
            });
        }
        data.image_name = imageURL;

        try {
            await prisma.collectionimages.update({
                where: {
                    id,
                },
                data,
            });

            res.status(200).json("OK");
        } catch {
            res.status(500).json({ message: "Failed to edit" });
        }
    });
};


/**
 * 
 * @route GET api/collection_images/:id
 * @desc Полчуние сотрудника
 * @access Private
 */

const collection_image = async (req, res) => {
    const id = req.params.id;

    try {
        const collectionimage = await prisma.collectionimages.findUnique({
            where: {
                id,
            },
        });

        res.status(200).json(collectionimage);
    } catch {
        res.status(500).json({ message: "Failed to receive" });
    }
}


module.exports = {
    all,
    add,
    remove,
    edit,
    collection_image,
};