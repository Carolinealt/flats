import { FlatsCollection } from '../db/models/flat.js';

export const getAllFlats = async () => {
    const flats = await FlatsCollection.find();
    return flats;
};

export const getFlatById = async (flatId) => {
    const flat = await FlatsCollection.findById(flatId);
    return flat;
};