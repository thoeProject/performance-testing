import { CartPage } from "../pages/cart_page.js";
import { HomePage, AddItemOnHomePage } from "../pages/home_page.js";

export const options = {
    scenarios: {
        k6_workshop: {
            executor: 'ramping-vus',
            stages: [
                { target: 10, duration: "5s" }
            ],
        }
    },
};

export function tc001_add_item_from_home() {
    HomePage();
    AddItemOnHomePage()
    CartPage();
}

export default function () {
    tc001_add_item_from_home();
}

