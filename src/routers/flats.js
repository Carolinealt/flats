import { Router } from "express";
import { createFlatController, deleteFlatController, getAllFlatsController, getFlatByIdController, upsertFlatController } from "../controllers/flats.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();


router.get('/flats', ctrlWrapper(getAllFlatsController));

router.get('/flats/:flatId', ctrlWrapper(getFlatByIdController));

router.post('/flats/', ctrlWrapper(createFlatController));

router.delete('/flats/:flatId', ctrlWrapper(deleteFlatController));

router.put('/flats/:flatId', ctrlWrapper(upsertFlatController));

router.patch('/flats/:flatId', ctrlWrapper(getFlatByIdController));


export default router;