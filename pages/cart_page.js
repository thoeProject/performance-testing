import http from "k6/http";
import { check, sleep } from "k6";

export default function(){
    CartPage()
}

export function CartPage(){
    // Step 1: Assess cart page sucesssfully
    let response = http.get("http://ecommerce.test.k6.io/cart/")
    check(response, {
        'View page cart OK': (r) => r.body.includes("Proceed to checkout"),

    // Step 2: Verify cart has product name "woo - beanie"
        'Cart has item beanie': (r) => r.body.includes("beanie")
    })
    sleep(0.5)
}