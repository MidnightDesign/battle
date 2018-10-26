export const subtractUntil = (minuend: number, subtrahend: number, limit: number) => {
    const difference = minuend - subtrahend;
    return difference < limit ? limit : difference;
};
export const addUntil = (value: number, addend: number, limit: number) => {
    const sum = value + addend;
    return sum > limit ? limit : sum;
};
