import http from "k6/http";
import { check, group } from "k6";

export const options = {
    stages: [
        { target: 1, duration: "5s" },
    ],
    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<3000']
    },
    ext: {
        loadimpact: {
            projectID: 3641210,
        },
    }
};

const USERNAME = "test_" + Date.now()
const PASSWORD = "k6apitesting"

const BASE_URL = 'https://test-api.k6.io';

// Register an account, then login it
export function setup() {
    let res = http.post(
        `${BASE_URL}/user/register/`, JSON.stringify({
            first_name: "Crocodile",
            last_name: "Owner",
            username: USERNAME,
            password: PASSWORD
        }),
        {
            headers: { "Content-Type": "application/json" }
        },
        {
            tags: { name: 'RegisterAccount' },
        })

    check(res, {
        'Create an account': (r) => r.status === 201
    })

    // Use credential above to login 
    let response = http.post(
        `${BASE_URL}/auth/token/login/`, {
        username: USERNAME,
        password: PASSWORD,
        },
        {
            tags: { name: 'LoginAccount' },
        })

    check(response, {
        'Login success': (r) => r.status === 200
    })

    let authToken = response.json('access')
    return authToken
}

export default function (authToken) {
    // Prepare payload, header and url
    let headers = {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json"
    }

    let payload = JSON.stringify({
        "name": "test_" + Date.now(),
        "sex": "F",
        "date_of_birth": "2024-01-01"
    })

    let URL = `${BASE_URL}/my/crocodiles/`

    // Create new croc
    group('1. Create new croc', () => {
        let res_new_croc = http.post(
            URL, payload, { headers: headers },
            {
                tags: { name: 'Create new croc' },
            })

        check(res_new_croc, {
            'Create new croc': (r) => r.status === 201
        })

        // Get id of new croc
        let id = res_new_croc.json('id')
        URL = `${BASE_URL}/my/crocodiles/${id}/`
    })

    // Get all my crocs
    group('2. Get my croc', () => {
        let res_update_croc = http.get(
            URL, { headers: headers },
            {
                tags: { name: 'GetMyCrocs' },
            })
            
        check(res_update_croc, {
            'Get my croc': (r) => r.status === 200,
            'Check length of my croc > 0': (r) => r.body.length > 0
        })
    })

    // Update crocs
    group('3. Update information of a croc', () => {
        let res_update_croc = http.put(
            URL, payload, { headers: headers },
            {
                tags: { name: 'Update croc' },
            })

        check(res_update_croc, {
            'Update inf successfully': (r) => r.status === 200
        })
    })

    // Delete crocs
    group('4. Delete the croc', () => {
        let res_delete_croc = http.del(
            URL,
            null,
            { headers: headers },
            {
                tags: { name: 'DeleteCroc' },
            })

        check(res_delete_croc, {
            'Delete successfully': (r) => r.status === 204
        })
    })
}