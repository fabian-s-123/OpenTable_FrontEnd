import HttpService, { HTTPMETHOD } from "./http.services";

export default class ReservationHttpService {

    static makeReservation(values: any) {

        return HttpService.authorizedRequest(HTTPMETHOD.POST, '/customerReservations', values)
    }
}
