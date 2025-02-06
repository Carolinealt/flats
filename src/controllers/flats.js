import createHttpError from "http-errors";
import { getAllFlats, getFlatById } from "../services/flats.js";

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

};
