import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const value = await schema.validateAsync(req.body);

            console.info(value);

            next();
        } catch (error) {
            console.error(error);

            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    data: Joi.object({
        username: Joi.string().alphanum().min(3).max(15).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
        birth_year: Joi.number().integer().min(1900).max(2013)
    })
};
