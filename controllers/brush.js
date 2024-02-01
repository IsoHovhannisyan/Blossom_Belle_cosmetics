const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET api/hottour/all
 * @desc Получение всех горяъих туров
 * @access Private
 */

const all = async (req, res) => {
    const lang = req.query.lang || '';

    try {
        await prisma.brush.updateMany({
            where: {
                lang: 'en'
            },
            data: {
              btn_text: 'Watch',
            },
          });

          await prisma.brush.updateMany({
            where: {
                lang: 'am'
            },
            data: {
              btn_text: 'Դիտել',
            },
          });

          await prisma.brush.updateMany({
            where: {
                image: '/images/eyebrushes/eyebrushes_1705368105146_H13vzZLu-lmEI6bzhcm-ewuv.jpg'
            },
            data: {
              new: 'true',
            },
          });

          await prisma.brush.updateMany({
            where: {
                image: '/images/eyebrushes/eyebrushes_1705368593211_vGakVoS8vJRG1sN-ilrVYW7J.jpg'
            },
            data: {
              best_seller: 'true',
            },
          });

          await prisma.brush.updateMany({
            where: {
                image: '/images/eyebrushes/eyebrushes_1705368832147_VRQYKs177-r7o3zNpH4iASuR.jpg'
            },
            data: {
              sale: 25,
            },
          });


          await prisma.brush.updateMany({
            where: {
                image: '/images/lipbrushes/lipbrushes_1705369031432_sAIej3Q44YolD8cd1a2ZIpm6.jpg'
            },
            data: {
              new: 'true',
            },
          });

          await prisma.brush.updateMany({
            where: {
                image: '/images/cheekbrush/cheekbrush_1705369795408_hxIy-eQbp8Sckdt0EXvENLR9.jpg'
            },
            data: {
              new: 'true',
            },
          });

          await prisma.brush.updateMany({
            where: {
                image: '/images/facebrushes/facebrushes_1705369488559_GdD2UaBWrCzVKlixmEsx15om.jpg'
            },
            data: {
              best_seller: 'true',
            },
          });

          await prisma.brush.updateMany({
            where: {
                image: '/images/facebrushes/facebrushes_1705369598687_jG8AMthY352TKW4QE-2wy_wG.jpg'
            },
            data: {
              sale: 50,
            },
          });

          await prisma.brush.updateMany({
            where: {
                image: '/images/cheekbrush/cheekbrush_1705369988042_LWbTx2_ozh259zERmwXSah42.jpg'
            },
            data: {
                best_seller: 'true',
            },
          });

        const products = await prisma.brush.findMany(lang && {
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
    brush,
};