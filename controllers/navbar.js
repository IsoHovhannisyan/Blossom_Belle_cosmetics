const { prisma } = require("../prisma/prisma-client");


/**
 * @route GET api/navbar/all
 * @desc Получение всех сотрудников
 * @access Private
 */

const all = async (req, res) => {
    const lang = req.query.lang || '';

    try {
        const navbar = await prisma.navbar.findMany(lang && {
            where: {
                lang,
            },
        });

        res.status(200).json(navbar);
    } catch {
        res.status(400).json({ message: "Failed to receive" });
    }
};


/**
 * 
 * @route POST api/navbar/add
 * @desc Добавление сотрудника
 * @access Private
 */

const add = async (req, res) => {
    const data = req.body;

    if (!data.lang) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const navbar = await prisma.navbar.create({
        data: {
            ...data,
            authorId: req.user.id,
        },
    });

    res.status(201).json(navbar);
};


/**
 * 
 * @route POST api/navbar/remove
 * @desc Удаление сотрудника
 * @access Private
 */

const remove = async (req, res) => {
    const id = req.params.id;

    try {
        await prisma.navbar.delete({
            where: {
                id,
            },
        });

        res.status(200).json("OK");
    } catch {
        res.status(500).json({ message: "Failed to delete" });
    }
};

/**
 * 
 * @route PUT api/navbar/edit
 * @desc Редактирование сотрудника
 * @access Private
 */

const edit = async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    try {
        await prisma.navbar.update({
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
 * @route GET api/navbar/:id
 * @desc Полчуние сотрудника
 * @access Private
 */

const navbar = async (req, res) => {
    const id = req.params.id;

    try {
        const navbar = await prisma.navbar.findUnique({
            where: {
                id,
            },
        });

        res.status(200).json(navbar);
    } catch {
        res.status(400).json({ message: "Failed to receive" });
    }
};

module.exports = {
    all,
    add,
    remove,
    edit,
    navbar,
};