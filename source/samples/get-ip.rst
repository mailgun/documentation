
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -G \
      https://api.mailgun.net/v3/ips/127.0.01

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode getIP() throws UnirestException {
 
         HttpResponse<JsonNode> request = Unirest.get("https://api.mailgun.net/v3/ips/127.0.0.1")
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
  $ip = '127.0.0.1';

  # Issue the call to the client.
  $result = $mgClient->get("ips/$ip");

.. code-block:: py

 def get_ip():
     return requests.get(
         "https://api.mailgun.net/v3/ips/127.0.0.1",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_ip
   RestClient.get("https://api:YOUR_API_KEY"\
                  "@api.mailgun.net/v3/ips/127.0.0.1"\
                  {|response, request, result| response }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetIPChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetIP ().Content.ToString ());
     }

     public static IRestResponse GetIP ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("ip", "127.0.0.1", ParameterType.UrlSegment);
         request.Resource = "/ips/{ip}";
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func GetIP(domain, apiKey string) (mailgun.IPAddress, error) {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.GetIP(ctx, "127.0.0.1")
 }

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.get('/ips/127.0.0.1', function (error, body) {
   console.log(body);
 });
