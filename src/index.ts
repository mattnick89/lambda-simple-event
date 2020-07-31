import { HttpResponse } from './response.interface';

class LambdaSimpleEvent {
  private resourcePath: string;
  private resourceMethod: string;
  private apiID: string;
  private apiStage: string;
  private apiKey: string;

  private pathParameters: any = null;
  private queryParameters: any = null;
  private postBody: any = null;
  private authContext: any = null;
  private stageVariables: any;

  private originHeader: string = "*";

  constructor(private event: any) {

    this.resourcePath = event.requestContext.resourcePath;
    this.resourceMethod = event.requestContext.httpMethod;
    this.apiID = event.requestContext.apiId;
    this.apiStage = event.requestContext.stage;
    this.apiKey = event.headers['x-api-key'] ? event.headers['x-api-key'] : null;

    this.pathParameters = event.pathParameters;
    this.queryParameters = event.queryStringParameters;
    this.postBody = event.body ? JSON.parse(event.body) : null;
    this.stageVariables = event.stageVariables ? event.stageVariables : null;

    this.authContext = event.requestContext.authorizer ? event.requestContext.authorizer : null;
  }

  public success(statusCode: number = 200, body: any = null): HttpResponse {
    const bodyEncoded = !body ? 'OK' : JSON.stringify(body);
    return {
      "statusCode": statusCode,
      "headers": {
        'Access-Control-Allow-Origin': this.originHeader,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'x-api-key,*',
      },
      "body": bodyEncoded
    };
  }

  public error(statusCode: number = 400, body: any = null): HttpResponse {
    const bodyEncoded = !body ? 'OK' : JSON.stringify(body);
    return {
      "statusCode": statusCode,
      "headers": {
        'Access-Control-Allow-Origin': this.originHeader,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'x-api-key,*',
      },
      "body": bodyEncoded
    };
  }

  public getAllPostBody(): any {
    return this.postBody ? this.postBody : null;
  }

  public getPostBody(key: string): any {
    return this.postBody && this.postBody[key] ? this.postBody[key] : null;
  }

  public getAllQueryString(): any {
    return this.queryParameters;
  }

  public getQueryString(key: string): any {
    return this.queryParameters && this.queryParameters[key] ? this.queryParameters[key] : null;
  }

  public getAllPathParameters(): any {
    return this.pathParameters;
  }

  public getPathParameters(key: string): any {
    return this.pathParameters && this.pathParameters[key] ? this.pathParameters[key] : null;
  }

  public getApiKey(): string | null {
    return this.apiKey ? this.apiKey : null;
  }

  public getApiID(): string {
    return this.apiID;
  }

  public getApiPath(): string {
    return this.resourcePath;
  }

  public getApiMethod(): string {
    return this.resourceMethod;
  }

  public getApiStage(): string {
    return this.apiStage;
  }

  public getApiStageVariables(): any {
    return this.stageVariables ? this.stageVariables : null;
  }

  public getAuthorizerContext(): any {
    return this.authContext;
  }
  
  public setAllowOriginHeaders(headers: string){
	  this.originHeader = headers;
  }
}
module.exports = LambdaSimpleEvent;