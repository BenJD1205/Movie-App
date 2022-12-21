import jwt from 'jsonwebtoken';
import responseHandler from '../handlers/responseHandler.js';
import userModel from '../../models/user.model.js';

const tokenDecode = (req) => {
    try {
        const bearderHeader = req.headers['authorization'];
        if (bearderHeader) {
            const token = bearderHeader.split(" ")[1];
            return jwt.verify(token,process.env.JWT_SECRET)
        }
        return false;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const auth = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req);
    if (!tokenDecoded) return responseHandler.unAuthorize(res);
    const user = await userModel.findById(tokenDecoded.data);
    if (!user) return responseHandler.unAuthorize(res);
    req.user = user;
    next();
}

export default {auth, tokenDecoded}