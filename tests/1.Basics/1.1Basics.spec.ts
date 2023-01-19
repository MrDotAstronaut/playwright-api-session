import { test } from '@playwright/test';

test('Basics of API Testing', async ({ request }) => {
    //HTTP Methods can be access using the request fixture.
    //The HTTP Method needs to be provided an endpoint.
    // This is the endpoint :
    // |----------------------Endpoint-----------------------|
    // https://dev60052.service-now.com/api/now/table/incident
    // |-----------baseURL-------------|----Resource-Path----|
    const response = await request.post("https://dev78076.service-now.com/api/now/table/incident", {
        //Each HTTP Method can also have additional options such as headers, data, params, etc.
        //Headers represent metadata associated with the request.
        headers: {
            //Authorization verifies whether user has access right.
            Authorization: "Basic YWRtaW46Zzl0Ti0lRTR0ZkRV",
        },
        //Data contains the payload.
        data: {
            short_description:"Mouse issue",
            category:"hardware"
        }
    });
    //status() will return the status of the response.
    console.log(response.status());
    //json() will return the json of the response.
    console.log(await response.json());
});