import { cities } from '../data/cities';

export const getNextCity = (usedCities: string[], lastChar: string | null): Promise<string> => {
    return new Promise((resolve) => {
        // const delay = Math.random() * (3000 - 1000) + 1000; // test
        const delay = Math.random() * (120000 - 10000) + 10000;
        setTimeout(() => {
            let remainingCities = cities.filter(city => !usedCities.includes(city));
            if (lastChar) {
                remainingCities = remainingCities.filter(city => city.toLowerCase().startsWith(lastChar));
            }
            const nextCity = remainingCities[Math.floor(Math.random() * remainingCities.length)];
            resolve(nextCity);
        }, delay);
    });
};