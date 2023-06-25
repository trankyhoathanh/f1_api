import joi from 'joi';
export const rankingMultipleSchema = joi.object().keys(
{
    from_year: joi.number().integer(),
    to_year: joi.number().integer()
});