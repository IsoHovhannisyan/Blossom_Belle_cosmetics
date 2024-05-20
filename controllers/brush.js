const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET api/hottour/all
 * @desc Получение всех горяъих туров
 * @access Private
 */

const all = async (req, res) => {
    const lang = req.query.lang || '';
    const imagePath = req.query.imagePath || ''; // New parameter for image path

    try {
        let products;
        if (imagePath) {
            products = await prisma.brush.findMany({
                where: {
                    image: imagePath, // Filter by image path
                },
            });
        } else {
            products = await prisma.brush.findMany(lang && {
                where: {
                    lang,
                },
            });
        }

        res.status(200).json(products);
    } catch {
        res.status(400).json({ message: "Failed to receive" });
    }
};


/**
 * 
 * @route POST api/hottour/add
 * @desc Добавление тура
 * @access Private
 */

const add = async (req, res) => {
    const data = req.body;

    if ( !data.category || !data.lang || !data.title || !data.descr || !data.image || !data.btn_text || !data.price) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const product = await prisma.brush.create({
        data: {
            ...data,
            authorId: req.user.id,
        },
    });

    return res.status(201).json(product);
};


/**
 * 
 * @route POST api/hottour/remove/:id
 * @desc Удаление тура
 * @access Private
 */

const remove = async (req, res) => {
    const id = req.params.id;

    try {
        await prisma.brush.delete({
            where: {
                id,
            },
        });

        res.status(200).json("OK");
    } catch {
        return res.status(500).json({ message: "Failed to delete" });
    }
};


/**
 * 
 * @route PUT api/hottour/edit/:id
 * @desc Редактирование сотрудника
 * @access Private
 */

const edit = async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    try {
        await prisma.brush.update({
            where: {
                id,
            },
            data,
        });

        res.status(200).json("OK");
    } catch {
        res.status(500).json({ message: "Failed to edit" });
    }
};

const editForUser = async (req, res) => {
    
    const quantity = req.body.quantity;
    
    const image = req.body.image;

    try {
        await prisma.brush.updateMany({
            where: {
                image: image
            },
            data: {
              quantity: quantity
            },
          });
        return res.status(200).json('ok');
    } catch(err) {
        res.status(500).json({ message: err });
    }
};


/**
 * 
 * @route GET api/hottour/:id
 * @desc Полчуние сотрудника
 * @access Private
 */

const brush = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await prisma.brush.findUnique({
            where: {
                id,
            },
        });

        res.status(200).json(product);
    } catch {
        res.status(400).json({ message: "Failed to receive" });
    }
};


module.exports = {
    all,
    add,
    remove,
    edit,
    editForUser,
    brush,
};