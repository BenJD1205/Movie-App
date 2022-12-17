import axios from "axios";

const getRequest = async (url) => {
    const res = await axios.get(url);
    return res.data;
};

export default { getRequest };
