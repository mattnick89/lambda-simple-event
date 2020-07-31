# Lambda Simple Event (LSE)

LSE is a tool for easily parsing events sent to Lambda from API Gateway using the proxy integration setting. LSE also formulates syntactically correct responses.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install LSE.

```bash
npm i @mattnick/lambda-simple-event
```

## Usage

```javascript
const LambdaSimpleEvent = require('@mattnick/lambda-simple-event');

exports.handler = async (event) => {
    return new Promise((resolve) => {
        const lse = new LambdaSimpleEvent(event);
        return resolve(lse.success(200,{message: "OK"}));
    })
};

//Set Access-Control-Allow-Origin Header, defaults to "*"
const LambdaSimpleEvent = require('@mattnick/lambda-simple-event');

exports.handler = async (event) => {
    return new Promise((resolve) => {
        const lse = new LambdaSimpleEvent(event);
        lse.setAllowOriginHeaders('example.com');
        return resolve(lse.success(200,{message: "OK"}));
    })
};
```

## Example: Parsing post requests

```javascript
const LambdaSimpleEvent = require('@mattnick/lambda-simple-event');

exports.handler = async (event) => {
    return new Promise((resolve) => {
        const lse = new LambdaSimpleEvent(event);
  
        var body = lse.getAllPostBody();
        /* 
        {
            key1: "value1",
            key2: "value2"
        }
        */

        var key1 = lse.getPostBody('key1');
        // value1

        var key3 = lse.getPostBody('key3');
        // null

        return resolve(lse.success(200,{message: "OK"}));
    })
};
```

## Example: Parsing query string variables

```javascript
const LambdaSimpleEvent = require('@mattnick/lambda-simple-event');

exports.handler = async (event) => {
    return new Promise((resolve) => {
        const lse = new LambdaSimpleEvent(event);
  
        var queryString = lse.getAllQueryString();
        /* 
        {
            key1: "value1",
            key2: "value2"
        }
        */

        var key1 = lse.getQueryString('key1');
        // value1

        var key3 = lse.getQueryString('key3');
        // null

        return resolve(lse.success(200,{message: "OK"}));
    })
};
```

## Example: Parsing path parameters

```javascript
const LambdaSimpleEvent = require('@mattnick/lambda-simple-event');

exports.handler = async (event) => {
    return new Promise((resolve) => {
        const lse = new LambdaSimpleEvent(event);
  
        var params = lse.getAllPathParameters();
        /* 
        {
            key1: "value1",
            key2: "value2"
        }
        */

        var key1 = lse.getPathParameters('key1');
        // value1

        var key3 = lse.getPathParameters('key3');
        // null

        return resolve(lse.success(200,{message: "OK"}));
    })
};
```

## Example: Parsing Authorizer Context
Returns auth information from custom authorizers

```javascript
const LambdaSimpleEvent = require('@mattnick/lambda-simple-event');

exports.handler = async (event) => {
    return new Promise((resolve) => {
        const lse = new LambdaSimpleEvent(event);
  
        var auth = lse.getAuthorizerContext();
        /* 
        {
            userID: 9599,
            clientID: "3E2A9E6684218",
            ...
        }
        */

        return resolve(lse.success(200,{message: "OK"}));
    })
};
```

## Example: Other details

```javascript
const LambdaSimpleEvent = require('@mattnick/lambda-simple-event');

exports.handler = async (event) => {
    return new Promise((resolve) => {
        const lse = new LambdaSimpleEvent(event);
		
		//Retrieves API Keys Used by API Gateway 
        var apiKey = lse.getApiKey();
        // Returns: string or null
		
		//Returns the http path for the endpoint, does not include the stage
		var apiPath = lse.getApiPath();
		// /test/hello
		
		//Returns the current stage endpoint has been deployed using.
		var apiStage = lse.getApiStage();
		// /beta
		
		//Returns the http method used to call the endpoint
		var apiMethod = lse.getApiMethod();
		// post
		
		//Returns the ID of the API used
		var apiID = lse.getApiID();
		// a3fc4e

        return resolve(lse.success(200,{message: "OK"}));
    })
};
```

## Example: Generating responses

```javascript
const LambdaSimpleEvent = require('@mattnick/lambda-simple-event');

exports.handler = async (event) => {
    return new Promise((resolve) => {
        const lse = new LambdaSimpleEvent(event);
        var statusCode = 200,
        var body = {
	        message: "Hello World"
        };
        return resolve(lse.success(statusCode, body))
    })
};

exports.handler = async (event) => {
    return new Promise((resolve) => {
        const lse = new LambdaSimpleEvent(event);
        var statusCode = 500,
        var body = {
	        message: "Something went wrong"
        };
        return resolve(lse.error(statusCode, body))
    })
};
```

## License
[MIT](https://choosealicense.com/licenses/mit/)