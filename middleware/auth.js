const jwt = require("jsonwebtoken");
const { prisma } = require("../prisma/prisma-client");

const auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization?.split(" ")[1];
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await prisma.user.findUnique({
                where: {
                    id: decoded.id,
                },
            });
            if (!user) {
                throw new Error("User not found");
            }
            req.user = user;
        } else {
            req.user = null; // Set req.user to null if no token is provided
        }

        // Check if the user is an admin
        if (req.user && req.user.role === 'admin') {
            // Allow admin to perform any action
            next();
        } else if (req.user && req.user.role === 'user') {
            // For regular users, allow modifying quantity of a single product only
            if (req.method === "PUT" && req.path.includes("editforuser")) {
                // Allow modifying quantity for a single product
                next();
            } else {
                // For any other requests or if the user is not a regular user, they are not authorized
                throw new Error("Not authorized");
            }
        } else {
            // If user is not authenticated, only allow PUT requests
            if (req.method === "PUT" && req.path.includes("editforuser") ) {
                next();
            } else {
                throw new Error("Not authorized");
            }
        }
    } catch (error) {
        res.status(401).json({ message: error.message || "Not authorized" });
    }
};


module.exports = {
    auth,
};
