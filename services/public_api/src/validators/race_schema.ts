import joi from 'joi';
export const raceSchema = joi.object().keys(
{
    laps: joi.number().integer(),
    grand_prix: joi.string().trim(),
    year: joi.number()
            .messages({ 'number.base': `Need a number` }),
    winner: joi.string().trim(),
    car: joi.string().trim()
});