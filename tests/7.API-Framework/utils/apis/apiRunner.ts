import { test } from '@playwright/test';
import { APICollection } from '../apis/apiCollection'
import { apiValidator } from './apiValidator'
import { apiSelector } from './apiSelector';

let apiCollection;
let preResJSON, testResJSON;

export function apiRunner(testCase) {
  test.describe(`${testCase.test.method}`, async () => {
    test.beforeEach(async ({ request }) => {
      console.log(testCase.test.name);
      console.log("\n-------TEST-START--------\n");
      apiCollection = new APICollection(request);
      if (testCase.preCondition) {
        console.log("~~~PRE~CONDTION~START~~~~");
        const preConditionResponse = await apiSelector(testCase.preCondition, apiCollection);
        preResJSON = await apiValidator(preConditionResponse, testCase.preCondition);
        console.log("~~~~PRE~CONDTION~END~~~~~\n");
      }
      else {
        console.log("No pre-condition required. ✅");
      }
    });
    test(`Running the test case for ${testCase.test.method}`, async () => {
      if (testCase.test.pathEval) {
        testCase.test.path = eval(testCase.test.pathEval);
        console.log("The sys_id has been appended to the test data. ✅");
      }
      if (testCase.test.queryParams.numberEval) {
        testCase.test.queryParams.number = eval(testCase.test.queryParams.numberEval);
        console.log("The number has been appended to the test data. ✅");
      }
      const testResponse = await apiSelector(testCase.test, apiCollection);
      testResJSON = await apiValidator(testResponse, testCase.test);
    });
    test.afterEach(async () => {
      if (testCase.postCondition) {
        console.log("\n~~~POST~CONDTION~START~~~");
        if (testCase.postCondition.pathEval) {
          testCase.postCondition.path = eval(testCase.postCondition.pathEval);
          console.log("The sys_id has been appended to the post-condition data. ✅");
        }
        const postConditionResponse = await apiSelector(testCase.postCondition, apiCollection);
        await apiValidator(postConditionResponse, testCase.postCondition);
        console.log("~~~~POST~CONDTION~END~~~~");
      }
      else {
        console.log("No post-condition required. ✅");
      }
      console.log(`\n--------TEST-END---------\n`);
    });
  });
}