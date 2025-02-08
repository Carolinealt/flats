import createHttpError from "http-errors";
import { createFlat, deleteFlat, getAllFlats, getFlatById, updateFlat } from "../services/flats.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";

export const getAllFlatsController = async (req, res, next) => {
    const { page, perPage } = parsePaginationParams(req.query);

    const { sortBy, sortOrder } = parseSortParams(req.query);

    const filter = parseFilterParams(req.query);

    const flats = await getAllFlats({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
    });

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
    const photos = req.files;

    const uploadedPhotos = await Promise.all(photos.map(async el => await saveFileToCloudinary(el)));

    const flat = await createFlat({ ...req.body, photos: uploadedPhotos });

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

    const photos = req.files;
    let uploadedPhotos;

    if (photos.length) {
        uploadedPhotos = await Promise.all(photos.map(async el => await saveFileToCloudinary(el)));
    }

    const result = await updateFlat(flatId, { ...req.body, photos: uploadedPhotos}, {
        upsert: true,
    });

    const status = result.isNew ? 201 : 200;

    res.status(status).json({
        status,
        message: `Successfully upserted a flat!`,
        data: result.flat,
    });

};

export const patchFlatController = async (req, res, next) => {
    const { flatId } = req.params;

    const newPhotos = req.files;
    let uploadedPhotos;

    if (newPhotos.length) {
        uploadedPhotos = await Promise.all(newPhotos.map(async el => await saveFileToCloudinary(el)));
    }

    const result = await updateFlat(flatId, { ...req.body, photos: uploadedPhotos });

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