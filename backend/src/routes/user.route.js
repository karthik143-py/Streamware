import express from 'express';
import { get } from 'mongoose';
import { getRecommendedUsers } from '../controllers/user.controller.js';
import { getFriends } from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { sendFriendRequest } from '../controllers/user.controller.js';
import { acceptFriendRequest } from '../controllers/user.controller.js';
import {getFriendRequests} from '../controllers/user.controller.js';
import { getOutgoingFriendReqs } from '../controllers/user.controller.js';
const router = express.Router();


router.use(protectRoute);
router.get('/',getRecommendedUsers);
router.get("/friends",getFriends);
router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-requests/:id/accept",acceptFriendRequest);
router.get("/friend-requests",getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);












export default router;