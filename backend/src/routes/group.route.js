import express from 'express'
import { verifySession } from '../middlewares/auth.middleware.js'
import { createGroup, deleteGroup, exploreGroups, getGroupById, getGroups, getMembers, joinGroup, leaveGroup } from '../controllers/group.controllers.js'


const router = express.Router()


router.get('/',verifySession,getGroups)   // GET- /api/groups - to get all groups where user is joined or user has created

router.post('/',verifySession,createGroup)   // POST- /api/groups - to create a group

router.get('/explore',verifySession,exploreGroups) // GET- /api/groups/explore - to get group based on search

router.get('/:groupId',verifySession,getGroupById) // GET- /api/groups/:groupId - get a single group details

router.post('/:groupId/join',verifySession,joinGroup) // POST- /api/groups/:groupId/join - join a group

router.delete('/:groupId/leave',verifySession,leaveGroup) // DELETE- /api/groups/:groupId/leave - leave a group

router.delete('/:groupId',verifySession,deleteGroup) // DELETE- /api/groups/:groupId - delete a group

router.get("/:groupId/members", verifySession, getMembers);


export default router;