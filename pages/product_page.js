import { check, sleep } from 'k6'
import http from 'k6/http'
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";

export default function ProductPage() {
    ViewProduct();
    AddItem();
}

let productSelected = ""

export function ViewProduct() {
    let productList = ['album', 'beanie', 'beanie-with-logo'];

    let rand = Math.floor(Math.random() * productList.length);
    productSelected = productList[rand];
    let response = http.get('http://ecommerce.test.k6.io/product/' + productSelected, {
        tags: { name: 'ProductPage' },
    });
    check(response, {
        'is accessed Product Page ': (r) => r.body.includes('Add to cart')
    })
    sleep(randomIntBetween(0, 1));
}

export function AddItem() {
    let body = {
        "quantity": 1,
        "add-to-cart": 24
    }
    let response = http.post("http://ecommerce.test.k6.io/product/" + productSelected, body, {
        tags: { name: 'ProductPage' },
    })
    check(response, {
        'Add item in Product Page successfully': (r) => r.body.includes("added to your cart")
    })
    sleep(randomIntBetween(1,2));
}