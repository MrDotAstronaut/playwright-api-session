import { expect } from '@playwright/test';
import Ajv from "ajv";

export async function apiValidator(response, data) {
    const ajv = new Ajv();
    console.log(response.status());
    await expect(response.status()).toBe(data.expectedResponse.statusCode);
    if(await response.text() && data.expectedResponse.schema && data.expectedResponse.body){
        const resJSON = await response.json();
        const validate = ajv.compile(data.expectedResponse.schema);
        const valid = validate(resJSON);
        expect(valid, 'Response Schema Validation').toBeTruthy();
        console.log('Response Schema has been validated. ✅');
        expect(resJSON, 'Response Body Validation').toMatchObject(data.expectedResponse.body);
        console.log('Response Body has been validated. ✅');
        return resJSON;
    }
    else if(!await response.text() && !data.expectedResponse.schema && !data.expectedResponse.body) {
        console.log("There is no response body. This is expected. ✅");
    }
    else {
        throw new Error("There is no response body. This is unexpected. 🚫");
    }
}