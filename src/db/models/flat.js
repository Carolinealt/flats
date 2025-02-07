import { Schema, model } from 'mongoose';

const flatsSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: false,
        },
        rooms: {
            type: Number,
            required: false,

            enum: [1, 2, 3]
        },
        photos:
        {
            type: Array,
            required: true
        }
    }, {
    timestamps: true,
    versionKey: false
}
);

export const FlatsCollection = model('flats', flatsSchema);