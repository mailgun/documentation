
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
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');

  # Issue the call to the client.
  $result = $mgClient->routes()->index();

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

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func ListRoutes(domain, apiKey string) ([]mailgun.Route, error) {
     mg := mailgun.NewMailgun(domain, apiKey)
     it := mg.ListRoutes(nil)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     var page, result []mailgun.Route
     for it.Next(ctx, &page) {
         result = append(result, page...)
     }

     if it.Err() != nil {
         return nil, it.Err()
     }
     return result, nil
 }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const list = await client.routes.list({"skip": 0, "limit": 5});
      console.log('list', list);
    } catch (error) {
      console.error(error);
    }
  })();
