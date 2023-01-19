export const listOfTestCases = [
    {
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
        test: {
            name: "Retrieving an incident [SUCCESS]",
            method: "GET",
            path: "/api/now/table/incident",
            queryParams: {
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
]