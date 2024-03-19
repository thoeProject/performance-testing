import http from "k6/http";
import { check, sleep } from "k6";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";

export default function () {
    HomePage()
    AddItemOnHomePage()
}

export function HomePage() {
    // Step 1: Access home page ecommerce
    let response = http.get("http://ecommerce.test.k6.io/", {
        tags: {
            name: "HomePage",
            type: "HTML"
        }
    })

    // Verify access successfully
    check(response, {
        'is accessed home page successfully': (r) => r.status === 200
    })

    // Step 2: Load some css, html of page
    response = http.get(
        'http://ecommerce.test.k6.io/wordpress/wp-includes/css/dist/block-library/style.min.css?ver=5.9',
        {
            headers: {
                accept: 'text/css,*/*;q=0.1',
                'accept-encoding': 'gzip, deflate',
                'accept-language':
                    'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
            },
        }
    )

    response = http.get(
        'http://ecommerce.test.k6.io/wordpress/wp-content/plugins/woocommerce/packages/woocommerce-blocks/build/vendors-style.css?ver=4.0.0',
        {
            headers: {
                accept: 'text/css,*/*;q=0.1',
                'accept-encoding': 'gzip, deflate',
                'accept-language':
                    'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
            },
        }
    )

    response = http.get(
        'http://ecommerce.test.k6.io/wordpress/wp-content/plugins/woocommerce/packages/woocommerce-blocks/build/style.css?ver=4.0.0',
        {
            headers: {
                accept: 'text/css,*/*;q=0.1',
                'accept-encoding': 'gzip, deflate',
                'accept-language':
                    'en-GB,en-US;q=0.9,en;q=0.8,es;q=0.7,nl;q=0.6,de;q=0.5,eo;q=0.4,fr;q=0.3,fil;q=0.2',
            },
        }
    )
}

export function AddItemOnHomePage(){
    // Step 3: Add some items into cart
    sleep(1)
    let quantity_items = randomIntBetween(1,3);
    let body = {
        "product_sku": "woo - beanie",
        "product_id": 16,
        "quantity": quantity_items
    }
    let response_cart = http.post("http://ecommerce.test.k6.io/?wc-ajax=add_to_cart", body, {
        tags: {
            name: "HomePage",
            type: "HTML"
        }
    })
    check(response_cart, {
        'is added item into cart successfully': (r) => r.status === 200,
    })
}
