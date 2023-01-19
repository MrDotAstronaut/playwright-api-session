//Default Pre-Condition
const preCondition = {
  path: "/api/now/table/incident",
  queryParams : {},
  method: "POST",
  payload: {
    short_description: "Mouse issue",
    category: "hardware",
  },
  expectedResponse: {
    statusCode: 201,
    schema: {
      type: "object",
      properties : {
        result: {
          type: "object",
          properties: {
            short_description: {type: "string"},
            category: {type: "string"}
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
};

//Default Post-Condition
const postCondition = {
  pathEval: "`/api/now/table/incident/${testResJSON.result.sys_id}`",
  queryParams : {},
  method: "DELETE",
  payload: {},
  expectedResponse: {
    statusCode: 204,
  },
};

//Test Data
export const listOfTestCases = [
  {
    test: {
      name: "Creating an incident [SUCCESS]",
      method: "POST",
      path: "/api/now/table/incident",
      queryParams : {},
      payload: {
        short_description: "Mouse issue",
        category: "hardware",
      },
      expectedResponse: {
        statusCode: 201,
        schema: {
          type: "object",
          properties : {
            result: {
              type: "object",
              properties: {
                short_description: {type: "string"},
                category: {type: "string"}
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
    postCondition: postCondition
  },

  {
    preCondition: preCondition,
    test: {
      name: "Retrieving an incident [SUCCESS]",
      method: "GET",
      path: "/api/now/table/incident",
      queryParams : {
        numberEval : "`${preResJSON.result.number}`"
      },
      expectedResponse: {
        statusCode: 200,
        schema: {
          type: "object",
          properties : {
            result: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  short_description: {type: "string"},
                  category: {type: "string"}
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
          }],
        }
      },
    },
    postCondition: {
      pathEval: "`/api/now/table/incident/${testResJSON.result[0].sys_id}`",
      queryParams : {},
      method: "DELETE",
      payload: {},
      expectedResponse: {
        statusCode: 204,
      },
    }
  },

  {
    preCondition: preCondition,
    test:   {
      name: "Modifying an incident [SUCCESS]",
      method: "PUT",
      pathEval: "`/api/now/table/incident/${preResJSON.result.sys_id}`",
      queryParams : {},
      payload: {
        short_description: "Microsoft office in not working",
        category: "software",
      },
      expectedResponse: {
        statusCode: 200,
        schema: {
          type: "object",
          properties : {
            result: {
              type: "object",
              properties: {
                short_description: {type: "string"},
                category: {type: "string"}
              }
            }
          },
          additionalProperties: true
        },
        body: {
          result: {
            short_description: "Microsoft office in not working",
            category: "software",
          },
        }
      },
    },
    postCondition: postCondition
  },

  {
    preCondition: preCondition,
    test:   {
      name: "Updating an incident [SUCCESS]",
      method: "PATCH",
      pathEval: "`/api/now/table/incident/${preResJSON.result.sys_id}`",
      queryParams : {},
      payload: {
        short_description: "Wifi is not working",
        category: "network",
      },
      expectedResponse: {
        statusCode: 200,
        schema: {
          type: "object",
          properties : {
            result: {
              type: "object",
              properties: {
                short_description: {type: "string"},
                category: {type: "string"}
              }
            }
          },
          additionalProperties: true
        },
        body: {
          result: {
            short_description: "Wifi is not working",
            category: "network",
          },
        }
      },
    },
    postCondition: postCondition
  },

  {
    preCondition: preCondition,
    test: {
      name: "Deleting an incident [SUCCESS]",
      method: "DELETE",
      pathEval: "`/api/now/table/incident/${preResJSON.result.sys_id}`",
      queryParams : {},
      payload: {},
      expectedResponse: {
        statusCode: 204
      },
    },
  },
];