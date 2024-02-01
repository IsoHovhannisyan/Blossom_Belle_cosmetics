const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET api/hottour/all
 * @desc Получение всех горяъих туров
 * @access Private
 */

const all = async (req, res) => {
    const lang = req.query.lang || '';

    try {

        // await prisma.skincare.updateMany({
        //     where: {
        //         image: '/images/skincaremouisturizers/skincaremouisturizers_1705011005689_-ksZ6bJo1rVj5BfXWAz9mckT.jpg'
        //     },
        //     data: {
        //       new: 'true',
        //     },
        //   });

        //   await prisma.skincare.updateMany({
        //     where: {
        //         image: '/images/skincaremouisturizers/skincaremouisturizers_1705011005689_-ksZ6bJo1rVj5BfXWAz9mckT.jpg'
        //     },
        //     data: {
        //       new: 'true',
        //     },
        //   });
        //   await prisma.skincare.updateMany({
        //     where: {
        //         image: '/images/skincaremouisturizers/skincaremouisturizers_1705011328324_BFTA2L31YinJfK4mFmsCQW_g.jpg'
        //     },
        //     data: {
        //       new: 'true',
        //     },
        //   });

        //   await prisma.skincare.updateMany({
        //     where: {
        //         image: '/images/skincaremouisturizers/skincaremouisturizers_1705011443280_7U6LXVFLV_wBM-viWmTnYbNM.jpg'
        //     },
        //     data: {
        //       best_seller: 'true',
        //     },
        //   });

        //   await prisma.skincare.updateMany({
        //     where: {
        //         image: '/images/skincaremouisturizers/skincaremouisturizers_1705011519237_6j5_xFRDzLyVRJRB1nwcMXsO.jpg'
        //     },
        //     data: {
        //       new: 'true',
        //     },
        //   });

        //   await prisma.skincare.updateMany({
        //     where: {
        //         image: '/images/skincaremouisturizers/skincaremouisturizers_1705011692179_AjJMgB51GAO06kHm8NOjllHp.jpg'
        //     },
        //     data: {
        //       new: 'true',
        //     },
        //   });

        //   await prisma.skincare.updateMany({
        //     where: {
        //         image: '/images/skincaremouisturizers/skincaremouisturizers_1705011867213_XqKvNi73Fcn-_2AbnOv19LK5.jpg'
        //     },
        //     data: {
        //       best_seller: 'true',
        //     },
        //   });

        //   await prisma.skincare.updateMany({
        //     where: {
        //         image: '/images/skincarecleansers/skincarecleansers_1705012063801__f1WCz8h7laftgLney1EAPgz.jpg'
        //     },
        //     data: {
        //       best_seller: 'true',
        //     },
        //   });

        //   await prisma.skincare.updateMany({
        //     where: {
        //         image: '/images/skincarecleansers/skincarecleansers_1705012167843_-8FizPBE4FbqrtPExNHxpPMW.jpg'
        //     },
        //     data: {
        //       best_seller: 'true',
        //     },
        //   });

        //   await prisma.skincare.updateMany({
        //     where: {
        //         image: '/images/skincarecleansers/skincarecleansers_1705012256084_0e1IE30-25iJMFvHi3e-_gkR.jpg'
        //     },
        //     data: {
        //       new: 'true',
        //     },
        //   });


        //   await prisma.skincare.updateMany({
        //     where: {
        //         image: '/images/skincarecleansers/skincarecleansers_1705012424114_J852dcr9NNX0TeJWGhZyL6Mo.jpg'
        //     },
        //     data: {
        //       new: 'true',
        //     },
        //   });

        //   await prisma.skincare.updateMany({
        //     where: {
        //         image: '/images/skincarecleansers/skincarecleansers_1705012519419_4NS588Sug8EqwtLoEo1vZOjE.jpg'
        //     },
        //     data: {
        //       new: 'true',
        //     },
        //   });

        //   await prisma.skincare.updateMany({
        //     where: {
        //         image: '/images/skincarecleansers/skincarecleansers_1705012606592_jikls22USnzcMiSRDS2LhOfQ.jpg'
        //     },
        //     data: {
        //       new: 'true',
        //     },
        //   });
          
        //   await prisma.skincare.updateMany({
        //     where: {
        //         image: '/images/skincaremask/skincaremask_1705013261296_6Q_r3Ua_VAVPz89FgSqbu9EX.jpg'
        //     },
        //     data: {
        //       new: 'true',
        //     },
        //   });

        //   await prisma.skincare.updateMany({
        //     where: {
        //         image: '/images/skincaremask/skincaremask_1705013392567_aiqAamzseR3YXYIDHgIR4DM-.jpg'
        //     },
        //     data: {
        //         best_seller: 'true',
        //     },
        //   });

        //   await prisma.skincare.updateMany({
        //     where: {
        //         image: '/images/skincaremask/skincaremask_1705013489230_22rYm5StWO1yzjJ1-cJuLwtj.jpg'
        //     },
        //     data: {
        //         new: 'true',
        //     },
        //   });

        //   await prisma.skincare.updateMany({
        //     where: {
        //         image: '/images/skincaremask/skincaremask_1705013576886_AhVp8n1waPyFDuqf5vRL4j1R.jpg'
        //     },
        //     data: {
        //         new: 'true',
        //     },
        //   });

        //   await prisma.skincare.updateMany({
        //     where: {
        //         image: '/images/skincaremask/skincaremask_1705013791852_B0LfkwyTn3nUC395r-4OfSj0.jpg'
        //     },
        //     data: {
        //         new: 'true',
        //     },
        //   });

        //   await prisma.skincare.updateMany({
        //     where: {
        //         image: '/images/skincaresunscreen/skincaresunscreen_1705014387989_Mi-SYC0gp_hYVgBmKrQF0V0c.jpg'
        //     },
        //     data: {
        //         new: 'true',
        //     },
        //   });

        //   await prisma.skincare.updateMany({
        //     where: {
        //         image: '/images/skincaresunscreen/skincaresunscreen_1705014089465_aiFRTDhjcOCudKY3HvLHL-In.jpg'
        //     },
        //     data: {
        //         best_seller: 'true',
        //     },
        //   });

          await prisma.skincare.updateMany({
            where: {
                image: '/images/skincaresunscreen/skincaresunscreen_1705014296408_dXlZ4nyU-pRdMKb5SIw7cK1S.jpg'
            },
            data: {
                sale: 50,
            },
          });

          await prisma.skincare.updateMany({
            where: {
                image: '/images/skincaremask/skincaremask_1705013969823_eOOLFrEr8Whdx0Z6RdDGPfo_.jpg'
            },
            data: {
                sale: 25,
            },
          });

          await prisma.skincare.updateMany({
            where: {
                image: '/images/skincarecleansers/skincarecleansers_1705013098190_KSPXXMgC-rn9gYfPMPuMJfEx.jpg'
            },
            data: {
                sale: 25,
            },
          });

          await prisma.skincare.updateMany({
            where: {
                image: '/images/skincaremouisturizers/skincaremouisturizers_1705011772252_vX2R7vswkEM21-Di_soiALTX.jpg'
            },
            data: {
                sale: 25,
            },
          });
          

          
        const products = await prisma.skincare.findMany(lang && {
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

    const product = await prisma.skincare.create({
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
        await prisma.skincare.delete({
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
        await prisma.skincare.update({
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

const skincare = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await prisma.skincare.findUnique({
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
    skincare,
};