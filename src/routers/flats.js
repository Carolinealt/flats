import { Router } from "express";
import { createFlatController, deleteFlatController, getAllFlatsController, getFlatByIdController, patchFlatController, upsertFlatController } from "../controllers/flats.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { createFlatSchema, updateFlatSchema } from "../validation/flats.js";
import { validateBody } from "../middlewares/validateBody.js";

const router = Router();

router.get('/flats', ctrlWrapper(getAllFlatsController));

router.get('/flats/:flatId', ctrlWrapper(getFlatByIdController));

router.post('/flats/', validateBody(createFlatSchema), ctrlWrapper(createFlatController));

router.delete('/flats/:flatId', ctrlWrapper(deleteFlatController));

router.put('/flats/:flatId', validateBody(updateFlatSchema), ctrlWrapper(upsertFlatController));

router.patch('/flats/:flatId', validateBody(updateFlatSchema), ctrlWrapper(patchFlatController));


export default router;