import { test, expect } from '@playwright/test';

let number;

test.beforeEach(async ({ request }) => {
    const response = await request.post("/api/now/table/incident", {
        data: {
            short_description: "Mouse issue",
            category: "hardware",
        },
    });
    const resJSON = await response.json();
    number = resJSON.result.number;
});

test('How to handle Query Parameter', async ({ request }) => {
    //Query Parameter in this case is the number we are passing.
    //The final endpoint looks something like this :
    // |-------------------------------Endpoint--------------------------------|
    // https://dev60052.service-now.com/api/now/table/incident?number=INC0010816
    // |------------baseURL------------|-----Resource-Path----|-Query-Parameter|
    const response = await request.get("/api/now/table/incident", {
        //params contains the query parameter.
        params: {
            number: number
        }
    });
    console.log(response.status());
    console.log(await response.json());
});