const { z } = require('zod');

const userCreateSchema = z.object({
    name: z.string().min(1),
    email: z.string().email()
})

module.exports = {userCreateSchema}