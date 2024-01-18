const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET api/home_page_label/all
 * @desc Получение всех горяъих туров
 * @access Private
 */

const all = async (req, res) => {
    const lang = req.query.lang || '';

    try {
        const homepagelabels = await prisma.homepagelabel.findMany(lang && {
            where: {
                lang,
            },
        });

        res.status(200).json(homepagelabels);
    } catch {
        res.status(400).json({ message: "Failed to receive" });
    }
};


/**
 * 
 * @route POST api/home_page_label/add
 * @desc Добавление тура
 * @access Private
 */

const add = async (req, res) => {
    const data = req.body;

    if (!data.lang || !data.label) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const homepagelabel = await prisma.homepagelabel.create({
        data: {
            ...data,
            authorId: req.user.id,
        },
    });

    res.status(201).json(homepagelabel);
};


/**
 * 
 * @route POST api/home_page_label/remove/:id
 * @desc Удаление тура
 * @access Private
 */

const remove = async (req, res) => {
    const id = req.params.id;

    try {
        await prisma.homepagelabel.delete({
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
 * @route PUT api/home_page_label/edit/:id
 * @desc Редактирование сотрудника
 * @access Private
 */

const edit = async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    try {
        await prisma.homepagelabel.update({
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
 * @route GET api/home_page_label/:id
 * @desc Полчуние сотрудника
 * @access Private
 */

const home_page_label = async (req, res) => {
    const id = req.params.id;

    try {
        const homepagelabel = await prisma.homepagelabel.findUnique({
            where: {
                id,
            },
        });

        res.status(200).json(homepagelabel);
    } catch {
        res.status(400).json({ message: "Failed to receive" });
    }
};


module.exports = {
    all,
    add,
    remove,
    edit,
    home_page_label,
};

