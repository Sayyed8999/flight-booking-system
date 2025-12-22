import { Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { UserModel } from './users.model';

export const getMyProfile = async (req: AuthRequest, res: Response) => {
    const user = await UserModel.findById(req.user!.id).select('-password');

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
};

export const updateMyProfile = async (req: AuthRequest, res: Response) => {
    const { name } = req.body;

    const user = await UserModel.findByIdAndUpdate(
        req.user!.id,
        { name },
        { new: true }
    ).select('-password');

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
};
