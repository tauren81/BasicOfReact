/*
 type { z } from "zod";
import axios from "axios";

export enum HTTPMethod {
  GET = "GET",
  POST = "POST",
}

export enum HTTPStatusCode {
  OK = 200,
}

const Employee = z.object({
  id: z.string(),
  name: z.string()
});

export default function api<Request, Response>({
  method,
  path,
  requestSchema,
  responseSchema,
}: {
  method: HTTPMethod;
  path: string;
  requestSchema: z.ZodType<Request>;
  responseSchema: z.ZodType<Response>;
}): (data: Request) => Promise<Response> {
  return function (requestData: Request) {
    requestSchema.parse(requestData);

    async function apiCall() {
      const response = await axios({
        baseURL: process.env.API_URL,
        method,
        url: path,
        [method === HTTPMethod.GET ? "params" : "data"]: requestData,
      });

      if (process.env.NODE_ENV === EnvName.PRODUCTION) {
        responseSchema.safeParseAsync(response.data).then((result) => {
          if (!result.success) {
            // TODO: Send error to sentry or other error reporting service
          }
        });

        return response.data as Response;
      }

      return responseSchema.parse(response.data);
    }

    return apiCall();
  };
}

async function getComments() {    
    let response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

    if (response.ok) { 
        let json = await response.json();
    }
    else {
      alert("Ошибка HTTP: " + response.status);
    }
}
    */
