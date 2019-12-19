import HttpService, { HTTPMETHOD } from "./http.services";

export default class ReservationHttpService {

    static makeReservation(values: any) {

        return HttpService.request(HTTPMETHOD.POST, '/customerReservations', values)
    }
}