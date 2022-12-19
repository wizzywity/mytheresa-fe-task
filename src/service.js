import axios from 'axios'

const apiClient = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Accept: 'application/json',
    },
})
apiClient.interceptors.request.use(function (config) {
    // use config.params if it has been set
    config.params = config.params || {};
    // add any client instance specific params to config
    config.params['api_key'] = "630a84f1532d35d24560a802f78c82e4"

    return config
})

export { apiClient }
