import http from 'k6/http';
import { check } from 'k6';

/**
 * The best way to add body, header for an unknow API is to debug on DevTool(F12)
 * For example, in this POST request, we may face with problem when we don't know add cfsr token into header or body, and also what its key (csrftoken) is
 */
let usernameArr = ['admin'];
let passwordArr = ['123'];

export default function() {
    // Access login page
    let response = http.get('https://test.k6.io/my_messages.php');
    check(response, {
        'is Unauthorized': r => r.body.includes('Unauthorized'),
    })

    // Get token from html
    let token = response.html().find("input[name=csrftoken]").attr("value")

    // Get random username and password from array
    let rand = Math.floor(Math.random() * 2);
    let username = usernameArr[rand];
    let password = passwordArr[rand];

    response = http.post('http://test.k6.io/login.php', { login: username, password: password, csrftoken: token});
    check(response, {
        'is status 200': (r) => r.status === 200,
        'is authorized': (r) => r.body.includes("successfully authorized")
    })
}