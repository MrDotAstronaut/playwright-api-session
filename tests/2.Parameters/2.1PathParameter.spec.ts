import { test, expect } from '@playwright/test';

let sys_id;

test.beforeEach(async ({ request }) => {
    const response = await request.post("/api/now/table/incident", {
        data: {
            short_description: "Mouse issue",
            category: "hardware",
        },
    });
    const resJSON = await response.json();
    sys_id = resJSON.result.sys_id;
});

test('How to handle Path Parameter', async ({ request }) => {
    //Path Parameter in this case is the sys_id we are passing.
    //The final endpoint looks something like this :
    // |--------------------------------------Endpoint----------------------------------------|
    // https://dev60052.service-now.com/api/now/table/incident/5acf035007dc21102b13fa9e7c1ed091
    // |------------baseURL------------|-----Resource-Path----|---------Path-Parameter--------|
    const response = await request.delete(`/api/now/table/incident/${sys_id}`, {
        data: {}
    });
    console.log(response.status());
});