export const getLastChar = (city: string): string => {
    const trimmedCity = city.trim().toLowerCase();
    const lastChar = trimmedCity[trimmedCity.length - 1];

    if (lastChar === 'ь' || lastChar === 'ъ' || lastChar === 'ы') {
        return trimmedCity[trimmedCity.length - 2];
    }

    return lastChar;
};