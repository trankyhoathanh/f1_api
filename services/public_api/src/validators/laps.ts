import joi from 'joi';
export const lapsSchema = joi.object().keys(
{
    id: joi.string().trim()
});