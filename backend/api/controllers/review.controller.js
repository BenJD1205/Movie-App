import responseHandler from '../handlers/responseHandler.js';
import reviewModel from '../../models/review.model.js';

const create = async (req, res, next) => {
    try {
        const { movieId } = req.params;
        const review = new reviewModel({
            user: req.user.id,
            movieId,
            ...req.body,
        })
        await review.save();
        responseHandler.created(res, {
            ...review._doc,
            id: review.id,
            user:req.user,
        })
    }
    catch {
        responseHandler.error(res);
    }
}