export async function apiSelector(testData, apiCollection) {
  switch (testData.method) {
    case "POST": {
      return apiCollection.create(testData.path, testData.payload);
    }
    case "GET": {
      return apiCollection.retrieve(testData.path, testData.queryParams);
    }
    case "PUT": {
      return apiCollection.modify(testData.path, testData.payload);
    }
    case "PATCH": {
      return apiCollection.update(testData.path, testData.payload);
    }
    case "DELETE": {
      return apiCollection.delete(testData.path, testData.payload);
    }
    default:
      throw new Error("Method is invalid. 🚫");
  }
}