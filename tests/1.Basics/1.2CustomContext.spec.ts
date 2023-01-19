import { test, request } from '@playwright/test';

let apiContext;

test.beforeAll(async () => {
    //We can define baseURL and extraHTTPHeaders while creating a custom context or directly within the 'playwright.config.ts' file as well.
    //The baseURL and extraHTTPHeaders apply to all HTTP method calls within its scope.
    //If they are defined in 'beforeAll' test hook then the scope is limited to the spec file.
    //If they are defined in 'playwright.config.ts' then the scope includes the entire project.
    /*If properties are defined in both 'beforeAll' and 'playwright.config.ts', it will consider 'beforeAll' as it contains the custom
    context and the HTTP Methods used on the custom context will be limited to the properties defined within it.
    */
    apiContext = await request.newContext({
        //baseURL should contain the domain name of the endpoint.
        //The resource path of the endpoint can be provided while call the HTTP method, it will automatically append the resource path to the baseURL.
        baseURL: "https://dev78076.service-now.com",
        //extraHTTPHeaders contains headers that are common for all api method calls. 
        extraHTTPHeaders: {
            Authorization: "Basic YWRtaW46Zzl0Ti0lRTR0ZkRV",
        }
    });
});

test('Setting Up A Custom Context', async () => {
    const response = await apiContext.post("/api/now/table/incident", {
        //headers can be provided for individual HTTP method calls as well.
        data: {
            short_description:"Mouse issue",
            category:"hardware"
        }
    });
    //
    console.log(response.status());
    console.log(await response.json());
});

test.afterAll(async () => {
    //It's good practice to dispose any custom context that is created.
    await apiContext.dispose();
});