import { test, expect } from '@playwright/test';
//Import the APICollection class which contains the HTTP Methods.
import { APICollection } from './utils/apis/apiCollection';
import Ajv from "ajv";

import { listOfTestCases } from './utils/testdata/apiTestData';

let apiCollection;
let preResJSON, testResJSON;
let sys_id, number;

for (const testCase of listOfTestCases) {
    test.describe(testCase.test.name, async () => {

        //Pre-Condition
        test.beforeEach(async ({ request }) => {
            //Initialize and object of the APICollection class and pass the request fixture as a parameter.
            /*This step is essential otherwise the APICollection will have no knowledge of the request context
            present within the test.*/
            apiCollection = new APICollection(request);
            //Now you can just call the respective method from the APICollection class when required.
            const response = await apiCollection.post(testCase.preCondition.path, testCase.preCondition.payload);
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

        test('Creating an APICollection class which contains custom methods for handling HTTP Method calls', async () => {
            if(testCase.test.queryParams.numberEval){
                testCase.test.queryParams.number = eval(testCase.test.queryParams.numberEval);
                console.log(testCase.test.queryParams.number);
            }
            const response = await apiCollection.get(testCase.test.path, testCase.test.queryParams);
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

        //Post-Condition
        test.afterEach(async () => {
            if(testCase.postCondition.pathEval){
                testCase.postCondition.path = eval(testCase.postCondition.pathEval);
                console.log(testCase.postCondition.path);
            }
            const response = await apiCollection.delete(testCase.postCondition.path,testCase.postCondition.payload);
            expect(response.status()).toBe(testCase.postCondition.expectedResponse.statusCode);
            console.log(response.status());
        });

    });
}