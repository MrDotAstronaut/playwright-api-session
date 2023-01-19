import { test } from '@playwright/test';

let sys_id, number;

//Pre-Condition
test.beforeEach(async ({ request }) => {
    const response = await request.post("/api/now/table/incident", {
        data: {
            short_description: "Mouse issue",
            category: "hardware",
        },
    });
    const resJSON = await response.json();
    sys_id = resJSON.result.sys_id;
    number = resJSON.result.number;
    console.log(response.status());
    console.log(await response.json());
});
test('Pre-Condition and Post-Condition running before and after test', async ({ request }) => {
    const response = await request.get("/api/now/table/incident", {
        params: {
            number: number
        }
    });
    console.log(response.status());
    console.log(await response.json());
});
//Post-Condition
test.afterEach(async ({ request }) => {
    const response = await request.delete(`/api/now/table/incident/${sys_id}`, {
        data: {}
    });
    console.log(response.status());
});