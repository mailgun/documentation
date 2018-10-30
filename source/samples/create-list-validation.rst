
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	-X POST \
	https://api.mailgun.net/v3/lists/LIST_NAME_HERE/validate

.. code-block:: rb

	def createListValidation
	  RestClient.post("https://api:YOUR_API_KEY"\
	                  "@api.mailgun.net/v3/lists/LIST_NAME_HERE/validate")
	end

.. code-block:: php
	
	// coming soon

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode createListValidation() throws UnirestException {
 
         HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.mailgun.net/v3/lists/LIST_NAME_HERE/validate")
             .basicAuth("api", API_KEY)
             .asJson();
 
         return jsonResponse.getBody();
     }
 }

.. code-block:: py

 def createListValidation():
     return requests.post(
         "https://api.mailgun.net/v3/lists/LIST_NAME_HERE/validate",
         auth=("api", "YOUR_API_KEY")})

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class CreateListValidationChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (CreateListValidation ().Content.ToString ());
     }

     public static IRestResponse CreateListValidation ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3/");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "/lists/LIST_NAME_HERE/validate";
         request.Method = Method.POST;
         return client.Execute (request);
     }

 }

.. code-block:: go

 func CreateListValidation(apiKey string) error {
        mg := mailgun.NewMailgun(domain, apiKey, "")
        return mg.CreateListValidation()
 }

.. code-block:: js

	var DOMAIN = 'YOUR_DOMAIN_NAME';
	var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY"});

	mailgun.post(`/lists/LIST_NAME_HERE/validate`, function (error, body) {
	  console.log(body);
	});