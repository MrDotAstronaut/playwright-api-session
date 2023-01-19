import { test, expect } from '@playwright/test';
import Ajv from "ajv";

let preResJSON, testResJSON;
let sys_id, number;

test.describe('Test with hard coded values.', async () => {
    test.beforeEach(async ({ request }) => {
        const response = await request.post("/api/now/table/incident", {
            data: {
                short_description: "Mouse issue",
                category: "hardware",
            },
        });
        expect(response.status()).toBe(201);
        preResJSON = await response.json();
        number = preResJSON.result.number;
        const ajv = new Ajv();
        const validate = ajv.compile({
            type: "object",
            properties: {
                result: {
                    type: "object",
                    properties: {
                        short_description: { type: "string" },
                        category: { type: "string" }
                    }
                }
            },
            additionalProperties: true
        });
        const valid = validate(preResJSON);
        expect(valid, 'Response Schema Validation').toBeTruthy();
        expect(preResJSON, 'Response Body Validation').toMatchObject({
            result: {
                short_description: "Mouse issue",
                category: "hardware",
            },
        });
        console.log(response.status());
        console.log(await response.json());
    });
    test('How to derive test data from JSON', async ({ request }) => {
        const response = await request.get(`/api/now/table/incident`, {
            params: {
                number: number
            }
        });
        expect(response.status()).toBe(200);
        testResJSON = await response.json();
        sys_id = testResJSON.result[0].sys_id;
        const ajv = new Ajv();
        const validate = ajv.compile({
            type: "object",
            properties: {
                result: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            short_description: { type: "string" },
                            category: { type: "string" }
                        }
                    }
                }
            },
            additionalProperties: true
        });
        const valid = validate(testResJSON);
        expect(valid, 'Response Schema Validation').toBeTruthy();
        expect(testResJSON, 'Response Body Validation').toMatchObject({
            result: [{
                short_description: "Mouse issue",
                category: "hardware",
            }]
        });
        console.log(response.status());
        console.log(await response.json());
    });
    test.afterEach(async ({ request }) => {
        const response = await request.delete(`/api/now/table/incident/${sys_id}`, {
            data: {}
        });
        expect(response.status()).toBe(204);
        console.log(response.status());
    });
});