//You can create an array of JSON data and save it in a variable.
export const listOfTestCases = [
    {
        //Pre-Condition data is mentioned here.
        preCondition: {
            path: "/api/now/table/incident",
            queryParams: {},
            method: "POST",
            payload: {
                short_description: "Mouse issue",
                category: "hardware",
            },
            expectedResponse: {
                statusCode: 201,
                schema: {
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
                },
                body: {
                    result: {
                        short_description: "Mouse issue",
                        category: "hardware",
                    },
                }
            },
        },
        //Test data is mentioned here.
        test: {
            name: "Retrieving an incident [SUCCESS]",
            method: "GET",
            path: "/api/now/table/incident",
            queryParams: {
                /*Data which is dynamic and should only be evaluated at runtime can wrapped in quotes,
                then use the eval() method when the statement needs to be evaluated during executions.*/
                numberEval: "`${preResJSON.result.number}`",
                number: ""
            },
            expectedResponse: {
                statusCode: 200,
                schema: {
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
                },
                body: {
                    result: [{
                        short_description: "Mouse issue",
                        category: "hardware",
                    }]
                }
            }
        },
        //Post-Condition data is mentioned here.
        postCondition: {
            pathEval: "`/api/now/table/incident/${testResJSON.result[0].sys_id}`",
            path: "",
            queryParams: {},
            method: "DELETE",
            payload: {},
            expectedResponse: {
                statusCode: 204,
            },
        }
    },
    //You can continue giving more JSON data within the array for each new test which can be iterated through using a loop in the test spec.
]