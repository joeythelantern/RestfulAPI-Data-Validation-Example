import { NextFunction, Request, Response } from 'express';

const joiSampleRoute = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        data: req.body
    });
};

export default { joiSampleRoute };
