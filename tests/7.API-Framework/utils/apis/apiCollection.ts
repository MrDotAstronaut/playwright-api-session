import { APIRequestContext } from "@playwright/test";

export class APICollection {

  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async create(path: string, payload: JSON) {
    const response = await this.request.post(path, {
      data: payload
    });
    console.log(`Path : ${path}`);
    return response;
  }
  async retrieve(path: string, queryParams: any) {
    const response = await this.request.get(path, {
      params: {
        number: queryParams.number
      }
    });
    console.log(`Path : ${path}`);
    console.log(`Query Parameter : ${queryParams.number}`);
    return response;
  }
  async modify(path: string, payload?: JSON) {
    const response = await this.request.put(path, {
      data: payload
    });
    console.log(`Path : ${path}`);
    return response;
  }
  async update(path: string, payload: JSON) {
    const response = await this.request.patch(path, {
      data: payload
    });
    console.log(`Path : ${path}`);
    return response;
  }
  async delete(path: string, payload?: string) {
    const response = await this.request.delete(path, {
      data: payload
    });
    console.log(`Path : ${path}`);
    return response;
  }
}