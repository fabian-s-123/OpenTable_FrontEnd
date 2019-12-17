import HttpService, { HTTPMETHOD } from "./http.services";

export default class RestaurantHttpService {

    static getRestaurants(values: any, callBack: any) {
        if (values.name != '') {
            HttpService.request(HTTPMETHOD.GET, '/restaurants/name=' + values.name)
            .then(response => {
                console.log(response)
                console.log(response.data)
                callBack(response);
            });
        } else {
            HttpService.request(HTTPMETHOD.GET, '/restaurants/city=""/zip=' + values.location)
            .then(response => {
                if (response.data.length === 0) {
                    HttpService.request(HTTPMETHOD.GET, '/restaurants/city=' + values.location + '/zip=' + '""')
                        .then(response => {
                           callBack(response);
                        })
                } else {
                   callBack(response);
                }
            });
        }
    }
}