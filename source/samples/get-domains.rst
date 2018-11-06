
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
	https://api.mailgun.net/v3/domains \
	-d skip=0 \
	-d limit=3

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 
 public class MGSample {
 
     // ...
 
     public static JsonNode getDomains() throws UnirestException {
 
         HttpResponse <JsonNode> request = Unirest.get("https://api.mailgun.net/v3/domains")
             .basicAuth("api", API_KEY)
             .queryString("skip", 0)
             .queryString("limit", 3)
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
  $result = $mgClient->get("domains", array('limit' => 5, 'skip' => 10));

.. code-block:: py

 def get_domains():
     return requests.get(
         "https://api.mailgun.net/v3/domains",
         auth=("api", "YOUR_API_KEY"),
         params={"skip": 0,
                 "limit": 3})

.. code-block:: rb

 def get_domains
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/domains", :params => {
     :skip => 0,
     :limit => 3
   }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetDomainsChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetDomains ().Content.ToString ());
     }

     public static IRestResponse GetDomains ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "domains";
         request.AddParameter ("skip", 0);
         request.AddParameter ("limit", 3);
         return client.Execute (request);
     }

 }

.. code-block:: go

 func GetDomains(domain, apiKey string) (int, []mailgun.Domain, error) {
   mg := mailgun.NewMailgun(domain, apiKey)
   return mg.GetDomains(-1, -1)
 }

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.get('/domains', function (error, body) {
   console.log(body);
 });
