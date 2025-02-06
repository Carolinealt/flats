import { Router } from "express";
import { createFlatController, getAllFlatsController, getFlatByIdController } from "../controllers/flats.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();


router.get('/flats', ctrlWrapper(getAllFlatsController));

router.get('/flats/:flatId', ctrlWrapper(getFlatByIdController));

router.post('/flats/', ctrlWrapper(createFlatController));

router.delete('/flats/:flatId', ctrlWrapper(getFlatByIdController));

router.put('/flats/:flatId', ctrlWrapper(getFlatByIdController));

router.patch('/flats/:flatId', ctrlWrapper(getFlatByIdController));


export default router;