const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET api/hottour/all
 * @desc Получение всех горяъих туров
 * @access Private
 */

const all = async (req, res) => {
    const lang = req.query.lang || '';

    try {

        await prisma.hair.updateMany({
            where: {
                lang: 'en'
            },
            data: {
              btn_text: 'Watch',
            },
          });

          await prisma.hair.updateMany({
            where: {
                lang: 'am'
            },
            data: {
              btn_text: 'Դիտել',
            },
          });

          await prisma.hair.updateMany({
            where: {
                image: '/images/hairshampoo/hairshampoo_1705192947815_-LJjgWgawd9JAhZpno-BThmw.jpg'
            },
            data: {
              new: 'true',
            },
          });

          await prisma.hair.updateMany({
            where: {
                image: '/images/hairshampoo/hairshampoo_1705193256609_WYTR00o9WTz-hvqPH3V5g3JH.jpg'
            },
            data: {
              new: 'true',
            },
          });

          await prisma.hair.updateMany({
            where: {
                image: '/images/hairshampoo/hairshampoo_1705193388554_-EmPyQwItG75adEcDcskqN_Z.jpg'
            },
            data: {
              best_seller: 'true',
            },
          });

          await prisma.hair.updateMany({
            where: {
                image: '/images/hairshampoo/hairshampoo_1705193504441_pu-4HLeXUa-4V2fXKoxBtPKQ.jpg'
            },
            data: {
              sale: 50,
            },
          });

          await prisma.hair.updateMany({
            where: {
                image: '/images/hairconditioner/hairconditioner_1705193738796_cZJ7WEPavbRF8sHzPxnjcq0X.jpg'
            },
            data: {
              sale: 25,
            },
          });

          await prisma.hair.updateMany({
            where: {
                image: '/images/hairhairoils/hairhairoils_1705193967925_YRuxqsm-tNaEmP-tMs64WXeh.jpg'
            },
            data: {
              new: 'true',
            },
          });

          await prisma.hair.updateMany({
            where: {
                image: '/images/hairhairoils/hairhairoils_1705194161318_KlNL8yiwY9ArRkG-T4xw9Ugh.jpg'
            },
            data: {
              best_seller: 'true',
            },
          });

          await prisma.hair.updateMany({
            where: {
                image: '/images/hairhairmask/hairhairmask_1705194307823_i5xPxK8NsmfcAgnB-Rj3CMde.jpg'
            },
            data: {
              new: 'true',
            },
          });

          await prisma.hair.updateMany({
            where: {
                image: '/images/hairhairmask/hairhairmask_1705194390358_e6bPjCBGacDx9-Q7MIGJgnQ-.jpg'
            },
            data: {
              new: 'true',
            },
          });

          await prisma.hair.updateMany({
            where: {
                image: '/images/hairhairmask/hairhairmask_1705194558748_LgOkuPKtTG0YQTz8yrz4VpKg.jpg'
            },
            data: {
              sale: 25,
            },
          });


        const products = await prisma.hair.findMany(lang && {
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

    const product = await prisma.hair.create({
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
        await prisma.hair.delete({
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
        await prisma.hair.update({
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

const hair = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await prisma.hair.findUnique({
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
    hair,
};

