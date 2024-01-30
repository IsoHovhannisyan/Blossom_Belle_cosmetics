const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET api/hottour/all
 * @desc Получение всех горяъих туров
 * @access Private
 */

const all = async (req, res) => {
    const lang = req.query.lang || '';

    try {
        // const updatePrisma = await prisma.makeup.updateMany({
        //     where: {
        //         image: "/images/makeuplips/makeuplips_1704848055000_qLcs0nAWBMlZ8fBxyO0TR5Z1.jpg",
        //     },
        //     data: {
        //       new: 'true',
        //     },
        //   });
        const products = await prisma.makeup.findMany(lang && {
            where: {
                lang,
            },
        });
        

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

    const product = await prisma.makeup.create({
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
        await prisma.makeup.delete({
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
        await prisma.makeup.update({
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


/**
 * 
 * @route GET api/hottour/:id
 * @desc Полчуние сотрудника
 * @access Private
 */

const makeup = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await prisma.makeup.findUnique({
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
    makeup,
};

