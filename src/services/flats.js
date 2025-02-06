import { FlatsCollection } from '../db/models/flat.js';

export const getAllFlats = async () => {
    const flats = await FlatsCollection.find();
    return flats;
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