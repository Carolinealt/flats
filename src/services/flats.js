import { SORT_ORDER } from '../constants/index.js';
import { FlatsCollection } from '../db/models/flat.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllFlats = async ({ page = 1,
    perPage = 10,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id', }) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const flatsQuery = await FlatsCollection.find();
    const flatsCount = await FlatsCollection.find()
        .merge(flatsQuery)
        .countDocuments();

    const flats = await flatsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec();

    const paginationData = calculatePaginationData(flatsCount, perPage, page);

    return {
        data: flats,
        ...paginationData,
    };
};

export const getFlatById = async (flatId) => {
    const flat = await FlatsCollection.findById(flatId);
    return flat;
};

export const createFlat = async (payload) => {
    const flat = await FlatsCollection.create(payload);
    return flat;
};

export const deleteFlat = async (flatId) => {
    const flat = await FlatsCollection.findOneAndDelete({
        _id: flatId,
    });

    return flat;
};

export const updateFlat = async (flatId, payload, options = {}) => {
    const rawResult = await FlatsCollection.findOneAndUpdate(
        { _id: flatId },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        },
    );

    if (!rawResult || !rawResult.value) return null;

    return {
        flat: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};