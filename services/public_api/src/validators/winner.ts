import joi from 'joi';
export const winnerSchema = joi.object().keys(
{
    id: joi.string().trim()
});