import { test, expect } from '@playwright/test';
//Import AJV module.
import Ajv from "ajv";

test('How to do Schema Validation', async ({ request }) => {
    const response = await request.post("/api/now/table/incident", {
        data: {
            short_description: "Mouse issue",
            category: "hardware",
        },
    });
    const resJSON = await response.json();
    //Initialize an AJV object.
    const ajv = new Ajv();
    //Using the compile method pass the expected schema for the response JSON and assign that to a variable.
    //When there is an object present in the response JSON, you can handle it the following way :
    // type: "object",
    // properties : {
    //     property1: { type: "string" },
    //     property2: { type: "integer"}
    // }
    //When there is an array present in the response JSON, you can handle it the following way :
    // type: "array",
    // items: {
    //     type: "object",
    //     properties: {
    //         property1: { type: "string" },
    //         property2: { type: "integer"}
    //     }
    // }
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
        //For required properties you can mention them inside required field.
        //Example :
        //required: ["short_description","category"],
        required: [],
        //When you want to check a subset of the schema you can set 'additionalProperties: true'.
        //And if the schema is exact you can set 'additionalProperties: false'.
        additionalProperties: true
    });
    //Then pass the response JSON as a parameter into the validate variable.
    //This will return a boolean.
    const valid = validate(resJSON);
    //This boolean variable can be used within an expect statement.
    expect(valid, 'Response Schema Validation').toBeTruthy();
    console.log(response.status());
    console.log(await response.json());
});