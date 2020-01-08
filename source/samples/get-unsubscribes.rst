
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -G \
       https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/unsubscribes

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode getUnsubscribes() throws UnirestException {

         HttpResponse <JsonNode> request = Unirest.get("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/unsubscribes")
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
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $domain = 'YOUR_DOMAIN_NAME';

  # Issue the call to the client.
  $result = $mgClient->suppressions()->unsubscribes()->index($domain);

.. code-block:: py

 def get_unsubscribes():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/unsubscribes",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_unsubscribes
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/unsubscribes"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetUnsubscribesChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetUnsubscribes ().Content.ToString ());
     }

     public static IRestResponse GetUnsubscribes ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "{domain}/unsubscribes";
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func ListUnsubscribes(domain, apiKey string) ([]mailgun.Unsubscribe, error) {
     mg := mailgun.NewMailgun(domain, apiKey)
     it := mg.ListUnsubscribes(nil)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     var page, result []mailgun.Unsubscribe
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

 mailgun.get(`/${DOMAIN}/unsubscribes`, function (error, body) {
   console.log(body);
 });
