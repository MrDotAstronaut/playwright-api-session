import { test, expect } from '@playwright/test';

test('How to do Body Validation', async ({ request }) => {
    const response = await request.post("/api/now/table/incident", {
        data: {
            short_description: "Mouse issue",
            category: "hardware",
        },
    });
    const resJSON = await response.json();
    //To validate the body you can pass the response json within expect() and pass the expected value within toMatchObject().
    //toMatchObject() will only check for the subset.
    //toEqual() will check for an exact match.
    expect(resJSON, 'Response Body Validation').toMatchObject({
        result: {
            short_description: "Mouse issue",
            category: "hardware",
        }
    });
    console.log(response.status());
    console.log(await response.json());
});