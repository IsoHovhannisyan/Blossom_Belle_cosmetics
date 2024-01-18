const { prisma } = require("../prisma/prisma-client");


/**
 * @route GET api/footer/all
 * @desc Получение всех сотрудников
 * @access Private
 */

const all = async (req, res) => {
    const lang = req.query.lang || '';

    try {
        const footer = await prisma.footer.findMany(lang && {
            where: {
                lang,
            },
        });

        res.status(200).json(footer);
    } catch {
        res.status(400).json({ message: "Failed to receive" });
    }
};


/**
 * 
 * @route POST api/footer/add
 * @desc Добавление сотрудника
 * @access Private
 */

const add = async (req, res) => {
    const data = req.body;

    if (!data.lang || !data.heading || !data.links || !data.info) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const footer = await prisma.footer.create({
        data: {
            ...data,
            authorId: req.user.id,
        },
    });

    res.status(201).json(footer);
};


/**
 * 
 * @route POST api/footer/remove
 * @desc Удаление сотрудника
 * @access Private
 */

const remove = async (req, res) => {
    const id = req.params.id;

    try {
        await prisma.footer.delete({
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
 * @route PUT api/footer/edit
 * @desc Редактирование сотрудника
 * @access Private
 */

const edit = async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    try {
        await prisma.footer.update({
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
 * @route GET api/footer/:id
 * @desc Полчуние сотрудника
 * @access Private
 */

const footer = async (req, res) => {
    const id = req.params.id;

    try {
        const footer = await prisma.footer.findUnique({
            where: {
                id,
            },
        });

        res.status(200).json(footer);
    } catch {
        res.status(400).json({ message: "Failed to receive" });
    }
};

module.exports = {
    all,
    add,
    remove,
    edit,
    footer,
};