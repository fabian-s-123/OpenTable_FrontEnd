import HttpService, { HTTPMETHOD } from "./http.services";

export default class RegistrationHttpService {

    static makeRegistration(values: any) {

        return HttpService.request(HTTPMETHOD.POST, '/customers', values)
    }
}