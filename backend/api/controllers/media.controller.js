import userModel from '../../models/user.model.js';
import favoriteModel from '../../models/'
import responseHandler from '../handlers/responseHandler.js';
import tmdbApi from '../../helpers/db.api.js';

const getList = async (req, res, next) => {
    try {
        const { page } = req.query;
        const { mediaType, mediaCategory } = req.params;
        const resp = await tmdbApi.mediaList({ mediaType, mediaCategory, page });
        return responseHandler.oke(res, resp);
    }
    catch {
        responseHandler.error(res);
    }
}

const getGenres = async (req, res, next) => {
    try {
        const { mediaType } = req.params;
        const resp = await tmdbApi.mediaGenres({ mediaType});
        return responseHandler.oke(res, resp);
    }
    catch {
        responseHandler.error(res);
    }
}

const search = async (req, res, next) => {
    try {
        const { page, query } = req.query;
        const { mediaType} = req.params;
        const resp = await tmdbApi.mediaSearch({ 
            query, page,
            mediaType: mediaType === "people" ? "person" : mediaType
        });
        responseHandler.oke(res, resp);
    }
    catch {
        responseHandler.error(res);
    }
}

const getDetail = async (req, res,next) => {
    try {
      const { mediaType, mediaId } = req.params;
  
      const params = { mediaType, mediaId };
  
      const media = await tmdbApi.mediaDetail(params);
  
      media.credits = await tmdbApi.mediaCredits(params);
  
      const videos = await tmdbApi.mediaVideos(params);
  
      media.videos = videos;
  
      const recommend = await tmdbApi.mediaRecommend(params);
  
      media.recommend = recommend.results;
  
      media.images = await tmdbApi.mediaImages(params);
  
      const tokenDecoded = tokenMiddlerware.tokenDecode(req);
  
      if (tokenDecoded) {
        const user = await userModel.findById(tokenDecoded.data);
  
        if (user) {
          const isFavorite = await favoriteModel.findOne({ user: user.id, mediaId });
          media.isFavorite = isFavorite !== null;
        }
      }
  
      media.reviews = await reviewModel.find({ mediaId }).populate("user").sort("-createdAt");
  
      responseHandler.ok(res, media);
    } catch (e) {
      console.log(e);
      responseHandler.error(res);
    }
  };
  
  export default { getList, getGenres, search, getDetail };