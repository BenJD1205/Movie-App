import userModel from '../../models/user.model.js';
import jwt from 'jsonwebtoken';
import responseHandler from '../handlers/responseHandler.js';

const signUp = async (req, res, next) => {
    try {
        const { username, password, displayName } = req.body;
        const checkUser = await userModel.findOne({ username });
        if(checkUser ) return responseHandler.badRequest(res,"Username already used")
        const user = new userModel();
        user.displayName = displayName;
        user.username = username;
        user.setPassword(password);

        await user.save();

        const token = jwt.sign({data:user.id},process.env.JWT_SECRET,{expiresIn:"24h"})
        responseHandler.created(res, {
            token,
            ...user._doc,
            id:user._id
        })
    }
    catch {
        responseHandler.error(res);
    }
}

const signIn = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username }).select("Username password slat is displayName")
        if (!user) return responseHandler.badRequest(res, "User not exist!");
        if (!user.validPassword(password)) return responseHandler.badRequest(res, "Wrong password");
        const token = jwt.sign({data:user.id},process.env.JWT_SECRET,{expiresIn:"24h"})

        user.password = undefined;
        user.salt = undefined;
        responseHandler.created(res, {
            token,
            ...user._doc,
            id:user._id
        })
    }
    catch {
        responseHandler.error(res);
    }
}

const updatePassword = async (req, res, next) => {
    try {
        const { password, newPassword } = req.body;
        const user = await userModel.findById(req.user.id).select("password is salt")
        if (!user) return responseHandler.unAuthorize(res);
        if (!user.validPassword(password)) return responseHandler.badRequest(res, "Wrong password");
        user.setPassword(newPassword);
        await user.save();
        responseHandler.oke(res);
    }
    catch {
        responseHandler.error(res);
    }
}

const getUserInfo = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) return responseHandler.notFound(res);
        responseHandler.oke(res, user);
    }
    catch {
        responseHandler.error(res);
    }
}

export default {
    signUp,
    signIn,
    getUserInfo,
    updatePassword
}