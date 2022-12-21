import favoriteModel from '../../models/favorite.model.js';
import responseHandler from '../handlers/responseHandler.js';

const addFavorite = async (req, res, next) => {
    try {
        const isFavorite = await favoriteModel.findOne({
            user: req.user.id,
            mediaId:req.body.mediaId
        })
        if (isFavorite) return responseHandler.oke(res, isFavorite);
        const favorite = new favoriteModel({
            ...req.body,
            user:req.user.id
        })
        await favorite.save();
        responseHandler.created(res, favorite);
    }
    catch {
        responseHandler.error(res);
    }
}

const removeFavorite = async (req, res, next) => {
    try {
        const { favoriteId } = req.params;
        const favorite = await favoriteModel.findOne({
            user: req.user.id,
            _id:favoriteId
        })
        if (!favorite) return responseHandler.notFound(res);
        await favorite.remove();
        responseHandler.oke(res);
    }
    catch {
        responseHandler.error(res);
    }
}

const getFavoritesOfUser = async (req, res, next) => {
    try {
        const favorites = await favoriteModel.find({ user: req.user.id }).sort("-createdAt");
        responseHandler.oke(res, favorites);
    }
    catch {
        responseHandler.error(res);
    }
}

export default {
    getFavoritesOfUser,
    addFavorite,
    removeFavorite
}