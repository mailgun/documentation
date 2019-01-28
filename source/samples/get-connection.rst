
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -G \
      https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/connection

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode getConnections() throws UnirestException {
 
         HttpResponse<JsonNode> request = Unirest.get("https://api.mailgun.net/v3/domains/"+ YOUR_DOMAIN_NAME +"/connection")
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
  $domain = 'YOUR_DOMAIN_NAME';

  # Issue the call to the client.
  $result = $mgClient->get("domains/$domain/connection", array());

.. code-block:: py

 def get_connection():
     return requests.get(
         "https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/connection",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_connection
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/connection"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetConnectionChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetConnection ().Content.ToString ());
     }

     public static IRestResponse GetConnection ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "domains/{domain}/connection";
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func GetDomainConnection(domain, apiKey string) (mailgun.DomainConnection, error) {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.GetDomainConnection(ctx, domain)
 }

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.get(`/domains/${DOMAIN}/connection`, function (error, body) {
   console.log(body);
 });
