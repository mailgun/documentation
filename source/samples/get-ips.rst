
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -G \
      https://api.mailgun.net/v3/ips \
      -d dedicated="true"

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode getIPs() throws UnirestException {

         HttpResponse<JsonNode> request = Unirest.get("https://api.mailgun.net/v3/ips")
             .basicAuth("api", API_KEY)
             .queryString("dedicated", "true")
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
  $result = $mgClient->ips->index();

.. code-block:: py

 def get_ips():
     return requests.get(
         "https://api.mailgun.net/v3/ips",
         params={"dedicated": "true"},
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_ips
   RestClient.get("https://api:YOUR_API_KEY"\
                  "@api.mailgun.net/v3/ips?dedicated=true"\
                  {|response, request, result| response }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetIPsChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetIPs ().Content.ToString ());
     }

     public static IRestResponse GetIPs ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "ips";
         request.AddParameter ("dedicated", "true");
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func ListIPS(domain, apiKey string) ([]mailgun.IPAddress, error) {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     // Pass 'true' to only return dedicated ips
     return mg.ListIPS(ctx, true)
 }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const ips = await client.ips.list();
      console.log('ips', ips);
    } catch (error) {
      console.error(error);
    }
  })();

