const { z } = require('zod');

const addToCartSchema = z.object({
    productId: z.string().min(24),
    qty: z.string().regex(/^\d+$/)
})

module.exports = {addToCartSchema}