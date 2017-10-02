
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' https://api.mailgun.net/v3/exports

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode getListExports() throws UnirestException {
 
         HttpResponse<JsonNode> request = Unirest.get("https://api.mailgun.net/v3/domains/exports")
             .basicAuth("api", API_KEY)
             .asJson();
 
         return request.getBody();
     }
 }

.. code-block:: php

    Exports are unsupported in the php client bindings

.. code-block:: py

 def get_exports():
     return requests.get(
         "https://api.mailgun.net/v3/exports",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_exports
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/exports"
   }
 end

.. code-block:: csharp

 public static IRestResponse GetExports() {
 	RestClient client = new RestClient();
 	client.BaseUrl = new Uri("https://api.mailgun.net/v3");
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
 	RestRequest request = new RestRequest();
 	request.Resource = "exports";
 	return client.Execute(request);
 }

.. code-block:: go

    Exports are unsupported in the go client bindings

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.get('/exports', function (error, body) {
   console.log(body);
 });
