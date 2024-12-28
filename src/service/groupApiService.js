import axios from '../utils/axiosCustomize';

const fetchGroup = () => {
    return axios.get('/api/v1/group/read');
};

export { fetchGroup };
