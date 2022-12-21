import responseHandler from '../handlers/responseHandler.js';
import tmdbApi from '../../helpers/db.api.js';

const personDetail = async (req, res, next) => {
    try {
        const { personId } = req.params;
        const person = await tmdbApi.personDetail({personId})
        responseHandler.oke(res, person);
    }
    catch {
        responseHandler.error(res);
    }
}

const personMedias = async (req, res, next) => {
    try {
        const { personId } = req.params;
        const medias = await tmdbApi.personMedias({ personId });
        responseHandler.oke(res, medias);
    }
    catch {
        responseHandler.error(res);
    }
}

export default {
    personMedias,personDetail
}