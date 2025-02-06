import { Router } from "express";
import { createFlatController, deleteFlatController, getAllFlatsController, getFlatByIdController, patchFlatController, upsertFlatController } from "../controllers/flats.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { createFlatSchema, updateFlatSchema } from "../validation/flats.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";

const router = Router();

router.get('/flats', ctrlWrapper(getAllFlatsController));

router.get('/flats/:flatId', isValidId, ctrlWrapper(getFlatByIdController));

router.post('/flats/', validateBody(createFlatSchema), ctrlWrapper(createFlatController));

router.delete('/flats/:flatId', isValidId, ctrlWrapper(deleteFlatController));

router.put('/flats/:flatId', isValidId, validateBody(updateFlatSchema), ctrlWrapper(upsertFlatController));

router.patch('/flats/:flatId', isValidId, validateBody(updateFlatSchema), ctrlWrapper(patchFlatController));


export default router;