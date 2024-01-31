const { z } = require('zod');

const productCreateSchema = z.object({
    name: z.string().min(1),
    price: z.string().regex(/^\d+$/, "price should be numeric digit only").min(1),
    description: z.string().optional(),
    stock: z.string().regex(/^\d+$/),
    product_type: z.string().regex(/^clothing|electronics|groceries$/, "product_type must be either clothing, electronics, groceries")
})

module.exports = {productCreateSchema}