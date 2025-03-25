import {Router} from 'express'
import {getContent} from '../controllers/contentController.js'
const router = Router()

router.get('/generate',getContent)

export default router;