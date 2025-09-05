// import express from "express";
// const router = express.Router();

// router.get("/", (req, res) => {
//   res.json({ message: "User API working" });
// });

// export default router;


import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/",(req,res)=>{
  res.json({message:"User API Working"});
})


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUserProfile);


export default router;
