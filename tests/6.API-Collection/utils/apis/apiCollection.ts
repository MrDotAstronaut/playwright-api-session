import { APIRequestContext } from "@playwright/test"

export class APICollection{

    //Local variable for storing request context.
    private request: APIRequestContext;

    //We are recieving the request context from the test spec.
    constructor(request: APIRequestContext){
        //The request context is assigned to the local instance of request.
        this.request = request;
    }

    //We are creating a custom function for each HTTP Method to avoid repetitive code in test specs.
    async post(path: string, payload: JSON){
        const response = await this.request.post(path,{
            data: payload,
        });
        return response;
    }

    async get(path: string, queryParams: any){
        const response = await this.request.get(path,{
            params: {
                number: queryParams.number
            }
        });
        return response;
    }

    async delete(path: string, payload: JSON){
        const response = await this.request.delete(path,{
            data: payload,
        });
        return response;
    }

}