import createHttpError from "http-errors";
import { createFlat, deleteFlat, getAllFlats, getFlatById, updateFlat } from "../services/flats.js";

export const getAllFlatsController = async (req, res, next) => {
    const flats = await getAllFlats();

    res.status(200).json({ data: flats });

};

export const getFlatByIdController = async (req, res, next) => {
    const { flatId } = req.params;
    const flat = await getFlatById(flatId);

    if (!flat) {
        throw createHttpError(404, 'Flat not found');
    }

    res.status(200).json({
        status: 200,
        message: `Successfully found flat with id ${flatId}!`,
        data: flat
    });

};

export const createFlatController = async (req, res) => {
    const flat = await createFlat(req.body);
    res.status(201).json({
        status: 201,
        message: `Successfully created a flat!`,
        data: flat,
    });
};

export const deleteFlatController = async (req, res, next) => {
    const { flatId } = req.params;

    const flat = await deleteFlat(flatId);

    if (!flat) {
        next(createHttpError(404, 'Flat not found'));
        return;
    }

    res.status(204).send();
};

export const upsertFlatController = async (req, res, next) => {
    const { flatId } = req.params;

    const result = await updateFlat(flatId, req.body, {
        upsert: true,
    });

    if (!result) {
        next(createHttpError(404, 'Flat not found'));
        return;
    }

    const status = result.isNew ? 201 : 200;

    res.status(status).json({
        status,
        message: `Successfully upserted a flat!`,
        data: result.flat,
    });

};

export const patchFlatController = async (req, res, next) => {
    const { flatId } = req.params;
    const result = await updateFlat(flatId, req.body);

    if (!result) {
        next(createHttpError(404, 'Flat not found'));
        return;
    }

    res.json({
        status: 200,
        message: `Successfully patched a flat!`,
        data: result.flat,
    });
};