const { prisma } = require("../prisma/prisma-client");

const all = async (req, res) => {
    try {
        const purchasedProducts = await prisma.purchasedProduct.findMany({
            include: {
                user: true // Include user information if needed
            }
        });

        // Send the purchased products as a response
        res.status(200).json(purchasedProducts);
    } catch (error) {
        console.error('Error occurred while fetching purchases:', error);
        res.status(500).json({ message: 'Error occurred while fetching purchases' });
    }
};

const add = async (req, res) => {
    const { products } = req.body;

   try {
       // Ensure products is an array
       if (!Array.isArray(products)) {
           throw new Error('Products should be an array');
       }
       // Save purchased products to the database
       const purchaseTime = new Date();
       const createdProducts = await prisma.purchasedProduct.createMany({
           data: products.map(product => ({
               productId: product.id,
               productCategory: product.category,
               productTitle: product.title,
               numberOfSellers: product.quantityForOrder,
               purchaseTime: purchaseTime,
               userId: "6604bf6797e72c237ccc4403"
           }))
       });

       console.log('New products saved successfully.');

       res.status(200).json({ message: 'Purchase successful', data: createdProducts });
   } catch (error) {
       console.error('Error occurred during purchase:', error);
       res.status(500).json({ message: 'Error occurred during purchase' });
   }
};

module.exports = {
    all,
    add,
};