
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
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');

  # Issue the call to the client.
  $result = $mgClient->domains()->index();

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

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func ListDomains(domain, apiKey string) ([]mailgun.Domain, error) {
     mg := mailgun.NewMailgun(domain, apiKey)
     it := mg.ListDomains(nil)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     var page, result []mailgun.Domain
     for it.Next(ctx, &page) {
         result = append(result, page...)
     }

     if it.Err() != nil {
         return nil, it.Err()
     }
     return result, nil
 }

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.get('/domains', function (error, body) {
   console.log(body);
 });
