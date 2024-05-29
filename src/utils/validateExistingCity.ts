import { cities } from '../data/cities';

export const validateExistingCity = (city: string): boolean => {
    return cities.includes(city);
};