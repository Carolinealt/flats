import Joi from "joi";

export const createFlatSchema = Joi.object({
    title: Joi.string().max(90).required().messages({
        'string.base': 'Title must be a string',
        'string.max': 'Title should have at most {#limit} characters',
        'any.required': 'Title is required'
    }),
    description: Joi.string().max(335).required().messages({
        'string.base': 'Description must be a string',
        'string.max': 'Description should have at most {#limit} characters',
        'any.required': 'Description is required'
    }),
    price: Joi.number().messages({
        // price: Joi.number().required().messages({
        'number.base': 'Price must be a number',
        'any.required': 'Price is required'
    }),
    // rooms: Joi.valid(1, 2, 3).required().messages({
    rooms: Joi.valid(1, 2, 3).messages({
        'number.base': 'Number of rooms must be a number',
        'number.valid': 'Number of rooms must contain 1, 2, 3 values only',
        'any.required': 'Number of rooms is required'
    }),
    photos: Joi.array().messages({
        'array.base': 'Photo must be an array',
    })
});

export const updateFlatSchema = Joi.object({
    title: Joi.string().max(90).messages({
        'string.base': 'Title must be a string',
        'string.max': 'Title should have at most {#limit} characters',
    }),
    description: Joi.string().max(335).messages({
        'string.base': 'Description must be a string',
        'string.max': 'Description should have at most {#limit} characters',
    }),
    price: Joi.number().messages({
        'number.base': 'Price must be a number',
    }),
    rooms: Joi.valid(1, 2, 3).messages({
        'number.base': 'Number of rooms must be a number',
        'number.valid': 'Number of rooms must contain 1, 2, 3 values only',
    }),
    photos: Joi.array().messages({
        'array.base': 'Photo must be an array',
    })
});