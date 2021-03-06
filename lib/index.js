"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LambdaSimpleEvent = /** @class */ (function () {
    function LambdaSimpleEvent(event) {
        this.event = event;
        this.pathParameters = null;
        this.queryParameters = null;
        this.postBody = null;
        this.authContext = null;
        this.originHeader = "*";
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
    LambdaSimpleEvent.prototype.success = function (statusCode, body) {
        if (statusCode === void 0) { statusCode = 200; }
        if (body === void 0) { body = null; }
        var bodyEncoded = !body ? 'OK' : JSON.stringify(body);
        return {
            "statusCode": statusCode,
            "headers": {
                'Access-Control-Allow-Origin': this.originHeader,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'x-api-key,*',
            },
            "body": bodyEncoded
        };
    };
    LambdaSimpleEvent.prototype.error = function (statusCode, body) {
        if (statusCode === void 0) { statusCode = 400; }
        if (body === void 0) { body = null; }
        var bodyEncoded = !body ? 'OK' : JSON.stringify(body);
        return {
            "statusCode": statusCode,
            "headers": {
                'Access-Control-Allow-Origin': this.originHeader,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'x-api-key,*',
            },
            "body": bodyEncoded
        };
    };
    LambdaSimpleEvent.prototype.getAllPostBody = function () {
        return this.postBody ? this.postBody : null;
    };
    LambdaSimpleEvent.prototype.getPostBody = function (key) {
        return this.postBody && this.postBody[key] ? this.postBody[key] : null;
    };
    LambdaSimpleEvent.prototype.getAllQueryString = function () {
        return this.queryParameters;
    };
    LambdaSimpleEvent.prototype.getQueryString = function (key) {
        return this.queryParameters && this.queryParameters[key] ? this.queryParameters[key] : null;
    };
    LambdaSimpleEvent.prototype.getAllPathParameters = function () {
        return this.pathParameters;
    };
    LambdaSimpleEvent.prototype.getPathParameters = function (key) {
        return this.pathParameters && this.pathParameters[key] ? this.pathParameters[key] : null;
    };
    LambdaSimpleEvent.prototype.getApiKey = function () {
        return this.apiKey ? this.apiKey : null;
    };
    LambdaSimpleEvent.prototype.getApiID = function () {
        return this.apiID;
    };
    LambdaSimpleEvent.prototype.getApiPath = function () {
        return this.resourcePath;
    };
    LambdaSimpleEvent.prototype.getApiMethod = function () {
        return this.resourceMethod;
    };
    LambdaSimpleEvent.prototype.getApiStage = function () {
        return this.apiStage;
    };
    LambdaSimpleEvent.prototype.getApiStageVariables = function () {
        return this.stageVariables ? this.stageVariables : null;
    };
    LambdaSimpleEvent.prototype.getAuthorizerContext = function () {
        return this.authContext;
    };
    LambdaSimpleEvent.prototype.setAllowOriginHeaders = function (headers) {
        this.originHeader = headers;
    };
    return LambdaSimpleEvent;
}());
module.exports = LambdaSimpleEvent;
