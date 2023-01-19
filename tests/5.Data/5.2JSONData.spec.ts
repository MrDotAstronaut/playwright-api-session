import { test, expect } from '@playwright/test';
import Ajv from "ajv";
//Import the variable which contains the array of the JSON data.
import { listOfTestCases } from './utils/testdata/apiTestData';

let preResJSON, testResJSON;
let sys_id, number;

//Loop through the array of JSON data.
for (const testCase of listOfTestCases) {
    /*When looping through data for tests and also using test hooks like beforeAll, beforeEach, afterEach and afterAll
    make sure to wrap everything within the loop inside a test block otherwise, the test hooks will execute more times 
    than intended.*/
    test.describe(testCase.test.name, async () => {
        test.beforeEach(async ({ request }) => {
            //You can replace all the data by traversing the JSON.
            const response = await request.post(testCase.preCondition.path, {
                data: testCase.preCondition.payload,
            });
            expect(response.status()).toBe(testCase.preCondition.expectedResponse.statusCode);
            preResJSON = await response.json();
            number = preResJSON.result.number;
            const ajv = new Ajv();
            const validate = ajv.compile(testCase.preCondition.expectedResponse.schema);
            const valid = validate(preResJSON);
            expect(valid, 'Response Schema Validation').toBeTruthy();
            expect(preResJSON, 'Response Body Validation').toMatchObject(testCase.preCondition.expectedResponse.body);
            console.log(response.status());
            console.log(await response.json());
        });
        test('How to derive test data from JSON', async ({ request }) => {
            if(testCase.test.queryParams.numberEval){
                console.log(testCase.test.queryParams.numberEval);
                /*When data is dynamic and needs to be appended back to the JSON data at runtime,
                you can use the eval() method, and the data you are passing into eval can be wrapped 
                in quotes. So when eval() is triggered the statement within the quotes is evaluated.*/
                testCase.test.queryParams.number = eval(testCase.test.queryParams.numberEval);
                console.log(testCase.test.queryParams.number);
            }
            const response = await request.get(testCase.test.path, {
                params: {
                    number: testCase.test.queryParams.number
                }
            });
            expect(response.status()).toBe(testCase.test.expectedResponse.statusCode);
            testResJSON = await response.json();
            sys_id = testResJSON.result.sys_id;
            const ajv = new Ajv();
            const validate = ajv.compile(testCase.test.expectedResponse.schema);
            const valid = validate(testResJSON);
            expect(valid, 'Response Schema Validation').toBeTruthy();
            expect(testResJSON, 'Response Body Validation').toMatchObject(testCase.test.expectedResponse.body);
            console.log(response.status());
            console.log(await response.json());
        });
        test.afterEach(async ({ request }) => {
            if(testCase.postCondition.pathEval){
                console.log(testCase.postCondition.pathEval);
                testCase.postCondition.path = eval(testCase.postCondition.pathEval);
                console.log(testCase.postCondition.path);
            }
            const response = await request.delete(testCase.postCondition.path, {
                data: testCase.postCondition.payload
            });
            expect(response.status()).toBe(testCase.postCondition.expectedResponse.statusCode);
            console.log(response.status());
        });
    });
}