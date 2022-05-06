/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
		http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	ENDPOINT_NAME
Amplify Params - DO NOT EDIT */

const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express')

const AWS = require("aws-sdk");
const fs = require("fs");

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

const sageMakerRuntime = new AWS.SageMakerRuntime({
	region: "us-east-1",
});


/****************************
* Example post method *
****************************/

const getPredictionData = (key, res) => {

	var s3 = new AWS.S3();
	s3.getObject({ Bucket: "meal-storage222219-test", Key: key },
		function (error, data) {
			if (error != null) {
				res.json({ success: 'Failed to retrieve an object:',body: error })
			} else {
				// res.json({ success: 'post call succeed!', url: req.url, body: req.body })
				// responseData = JSON.parse(Buffer.from(data.Body).toString());
				res.json({ success: 'post call succeed!', body: data });
				// var params = {
				// 	Body: bitmap,
				// 	EndpointName: "calorie-prediction-endpoint",
				// 	ContentType: "image/jpeg"
				// };
			
				// sageMakerRuntime.invokeEndpoint(params, function (err, data) {
				// 	if (err) {
				// 		console.log(err, err.stack);
				// 	} else {
				// 		responseData = JSON.parse(Buffer.from(data.Body).toString());
				// 		res.json({ success: 'post call succeed!', body: responseData });
				// 		console.log(responseData);
				// 	}
				// });
			}
		}
	);

}

app.post('/predictor', function (req, res) {
	// Add your code here
	if (req.body.key) {
		getPredictionData(req.body.key, res);
	} else {
		res.json({ success: 'No Key!', body: req.body });
	}
	// res.json({ success: 'post call succeed!', url: req.url, body: req.body })

});

app.listen(3000, function () {
	console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
