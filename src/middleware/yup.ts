import Yup from 'yup';
import { NextFunction, Request, Response } from 'express';
import { OptionalObjectSchema } from 'yup/lib/object';

export const ValidateYup = (schema: OptionalObjectSchema<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const value = await schema.isValid(req.body);

            console.info(value);

            next();
        } catch (error) {
            console.error(error);

            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    data: Yup.object().shape({
        name: Yup.string().required(),
        age: Yup.number().required().positive().integer(),
        email: Yup.string().email(),
        website: Yup.string().url(),
        createdOn: Yup.date().default(function () {
            return new Date();
        })
    })
};
