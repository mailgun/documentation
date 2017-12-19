
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
	https://api.mailgun.net/v3/routes \
	-d skip=1 \
	-d limit=1

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode getRoutes() throws UnirestException {
 
         HttpResponse <JsonNode> request = Unirest.get("https://api.mailgun.net/v3/routes")
             .basicAuth("api", API_KEY)
             .queryString("skip", "0")
             .queryString("limit","5")
             .asJson();
 
         return request.getBody();
     }
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');

  # Issue the call to the client.
  $result = $mgClient->get("routes", array('skip' => 5, 'limit' => 10));

.. code-block:: py

 def get_routes():
     return requests.get(
         "https://api.mailgun.net/v3/routes",
         auth=("api", "YOUR_API_KEY"),
         params={"skip": 1,
                 "limit": 1})

.. code-block:: rb

 def get_routes
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/routes", :params => {
     :skip => 1,
     :limit => 1
   }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetRoutesChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetRoutes ().Content.ToString ());
     }

     public static IRestResponse GetRoutes ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "routes";
         request.AddParameter ("skip", 1);
         request.AddParameter ("limit", 1);
         return client.Execute (request);
     }

 }

.. code-block:: go

 func GetRoutes(domain, apiKey string) (int, []mailgun.Route, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.GetRoutes(-1, -1)
 }

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.get('/routes', {"skip": 0, "limit": 5}, function (error, body) {
   console.log(body);
 });
