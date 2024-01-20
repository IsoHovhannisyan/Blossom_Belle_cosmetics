const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET api/home_page_label/all
 * @desc Получение всех горяъих туров
 * @access Private
 */

const all = async (req, res) => {
    const lang = req.query.lang || '';

    try {
        const Basketpagelabel = await prisma.basketpagelabel.findMany(lang && {
            where: {
                lang,
            },
        });

        res.status(200).json(Basketpagelabel);
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

    if (!data.lang || !data.title ||  !data.btn_text || !data.empty_text || !data.total || !data.basket_clear || !data.checkout) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const Basketpagelabel = await prisma.basketpagelabel.create({
        data: {
            ...data,
            authorId: req.user.id,
        },
    });

    return res.status(201).json(Basketpagelabel);
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
        await prisma.basketpagelabel.delete({
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
        await prisma.basketpagelabel.update({
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

const basket_page_label = async (req, res) => {
    const id = req.params.id;

    try {
        const Basketpagelabel = await prisma.basketpagelabel.findUnique({
            where: {
                id,
            },
        });

        res.status(200).json(Basketpagelabel);
    } catch {
        res.status(400).json({ message: "Failed to receive" });
    }
};


module.exports = {
    all,
    add,
    remove,
    edit,
    basket_page_label,
};
