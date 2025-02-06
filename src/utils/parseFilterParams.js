const parseRooms = (rooms) => {
    const isString = typeof rooms === 'string';
    if (!isString) return;

    const parsedNumber = parseInt(rooms);
    if (Number.isNaN(parsedNumber)) {
        return;
    };

    const isRooms = (rooms) => [1, 2, 3].includes(rooms);

    if (isRooms(rooms)) return rooms;
};

const parseNumber = (number) => {
    const isString = typeof number === 'string';
    if (!isString) return;

    const parsedNumber = parseInt(number);
    if (Number.isNaN(parsedNumber)) {
        return;
    }

    return parsedNumber;
};

export const parseFilterParams = (query) => {
    const { price, rooms } = query;

    const parsedRooms = parseRooms(rooms);
    const parsedPrice = parseNumber(price);

    return {
        rooms: parsedRooms,
        price: parsedPrice,
    };
};