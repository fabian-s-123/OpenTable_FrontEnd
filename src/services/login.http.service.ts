import HttpService, { HTTPMETHOD } from "./http.services";

export default class LoginHttpService {

    static login(values: any) {
        return HttpService.request(HTTPMETHOD.POST, "/auth/login", values)
    }
}