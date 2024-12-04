import { Router } from "express";
import { signup, login, me} from "../controller/auth.Controller";
import authMiddleware from "../middleware/auth.middleware";

const router:Router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get('/me',authMiddleware ,me);

export default router;
