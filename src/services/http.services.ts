import axios from 'axios';

export enum HTTPMETHOD {
    GET, PUT, POST, DELETE
}

const HTTPURL = "http://localhost:8080/api"

export default class HttpService {

    static request(httpMethod: HTTPMETHOD, path: string, data?: any) {
        const composedURL = HTTPURL + path;
        console.log(composedURL);
        switch(httpMethod) {
            case HTTPMETHOD.GET: 
                return axios.get(composedURL);
            case HTTPMETHOD.PUT:
                return axios.put(composedURL, data);
            case HTTPMETHOD.POST:
                return axios.post(composedURL, data);
            case HTTPMETHOD.DELETE:
                return axios.delete(composedURL);
        }
    }

    static authorizedRequest(httpMethod: HTTPMETHOD, path: string, data?: any) {
        const composedURL = HTTPURL + path;

        let config = {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('jws')
            }
        }

        console.log(composedURL, data, config)
        switch(httpMethod) {
            case HTTPMETHOD.GET: 
                return axios.get(composedURL, config);
            case HTTPMETHOD.PUT:
                return axios.put(composedURL, data, config);
            case HTTPMETHOD.POST:
                return axios.post(composedURL, data, config);
            case HTTPMETHOD.DELETE:
                return axios.delete(composedURL, config);
        }
    }
}