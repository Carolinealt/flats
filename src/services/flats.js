import { SORT_ORDER } from '../constants/index.js';
import { FlatsCollection } from '../db/models/flat.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllFlats = async ({ page = 1,
    perPage = 10,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
    filter = {} }) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const flatsQuery = await FlatsCollection.find();

    if (filter.price) {
        flatsQuery.where('price').gte(filter.price);
    }
    if (filter.rooms) {
        flatsQuery.where('rooms').equals(filter.rooms);
    }

    const [flatsCount, flats] = await Promise.all([
        FlatsCollection.find().merge(flatsQuery).countDocuments(),
        flatsQuery
            .skip(skip)
            .limit(limit)
            .sort({ [sortBy]: sortOrder })
            .exec(),
    ]);


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