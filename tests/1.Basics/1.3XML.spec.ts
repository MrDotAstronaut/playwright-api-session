import { test } from '@playwright/test';

test('Handling XML', async ({ request }) => {
    const response = await request.post("/api/now/table/incident", {
        headers: {
            //Content-Type determines the format of the request.
            "Content-Type": "application/xml",
            //Accept determines the format of the response.
            Accept: "application/xml"
        },
        data: "<request><entry><short_description>Mouse issue</short_description><category>hardware</category></entry></request>"
    });
    console.log(response.status());
    //For XML you can use body() method then convert it into string using toString().
    console.log((await response.body()).toString());
});