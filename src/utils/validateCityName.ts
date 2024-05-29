export const validateCityName = (city: string): boolean => {
    const regex = /^[а-яА-ЯёЁ\s-]*$/;
    return regex.test(city) && !city.startsWith(' ');
};