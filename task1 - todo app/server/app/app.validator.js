const { z } = require('zod');

const taskSchema = z.object({
    task: z.string().min(1),
    assignedTo: z.string(),
    priority: z.string().regex(/high|medium|low/).default("low")
})

module.exports = {taskSchema}