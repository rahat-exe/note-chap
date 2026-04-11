import express from 'express'
import { verifySession } from '../middlewares/auth.middleware.js'
import { createGroup } from '../controllers/group.controllers.js'


const router = express.Router()

router.post('/',verifySession,createGroup)

export default router;