import axiosClient from "../utils/axiosClient.js";
import tmdbEndpoints from "./db.endpoint.js";

const tmdbApi = {
    mediaList: async ({ mediaType, mediaCategory, page }) => axiosClient.getRequest(
        tmdbEndpoints.mediaList({mediaType,mediaCategory, page})
    ),
    mediaDetail: async ({mediaType,mediaCategory, page}) => axiosClient.getRequest(
        tmdbEndpoints.mediaList({mediaType,mediaCategory, page})
    ),
    mediaGenres:async ({ mediaType}) => axiosClient.getRequest(
        tmdbEndpoints.mediaGeneres({mediaType})
    ),
     mediaCredits: async ({mediaType,mediaId}) => axiosClient.getRequest(
        tmdbEndpoints.mediaCredits({mediaType,mediaId})
    ),
    mediaVideos: async ({mediaType,mediaId}) => axiosClient.getRequest(
        tmdbEndpoints.mediaVideos({mediaType,mediaId})
    ),
    mediaImages: async ({mediaType,mediaId}) => axiosClient.getRequest(
        tmdbEndpoints.mediaImages({mediaType,mediaId})
    ),
    mediaRecommend: async ({mediaType,mediaId}) => axiosClient.getRequest(
        tmdbEndpoints.mediaRecommend({mediaType,mediaId})
    ),
    mediaSearch: async ({mediaType,query,page}) => axiosClient.getRequest(
        tmdbEndpoints.mediaSearch({mediaType,query,page})
    ),
    personDetail: async ({personId}) => axiosClient.getRequest(
        tmdbEndpoints.personDetail({personId})
    ),
    personMedias: async ({personId}) => axiosClient.getRequest(
        tmdbEndpoints.personMedias({personId})
    ),
};

export default tmdbApi;
