
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v3/routes/4f3bad2335335426750048c6

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode getSingleRoute() throws UnirestException {
 
         HttpResponse <JsonNode> request = Unirest.get("https://api.mailgun.net/v3/routes/YOUR_ROUTE_ID")
             .basicAuth("api", API_KEY)
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
  $routeId = '4e97c1b2ba8a48567f007fb6';

  # Issue the call to the client.
  $result = $mgClient->get("routes/$routeId");

.. code-block:: py

 def get_route():
     return requests.get(
         "https://api.mailgun.net/v3/routes/4e97c1b2ba8a48567f007fb6",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_route
   RestClient.
     get("https://api:YOUR_API_KEY"\
         "@api.mailgun.net/v3/routes/"\
         "4e97c1b2ba8a48567f007fb6"){|response, request, result| response }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetRouteChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetRoute ().Content.ToString ());
     }

     public static IRestResponse GetRoute ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "routes/{id}";
         request.AddUrlSegment ("id", "4e97c1b2ba8a48567f007fb6");
         return client.Execute (request);
     }

 }

.. code-block:: go

 func GetRouteByID(domain, apiKey string) (Route, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.GetRouteByID("4e97c1b2ba8a48567f007fb6")
 }

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.get('/routes/your_route_id', function (error, body) {
   console.log(body);
 });
