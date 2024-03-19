import http from "k6/http";
import { check } from "k6";
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export default function(){
    // Get all list of crocodiles
    let response = http.get("https://test-api.k6.io/public/crocodiles/")
    check(response, {
        'Get all crocodiles': (r) => r.status === 200,
    })

    // Parse response to json and get random id
    let index = randomIntBetween(0,7)
    let id = response.json()[index]["id"]

    // Get information of one specific crocodiles
    // Get all list of crocodiles
    let res = http.get("https://test-api.k6.io/public/crocodiles/" + id)
    check(res, {
        'Get one crocodiles': (r) => r.status === 200,
    })
}