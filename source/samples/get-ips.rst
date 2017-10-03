
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
 
         HttpResponse<JsonNode> request = Unirest.get("https://api.mailgun.net/v3/ips)
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
  $mgClient = new Mailgun('YOUR_API_KEY');

  # Issue the call to the client.
  $result = $mgClient->get("ips", array(
    'dedicated' => "true"
  ));

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

 func GetIPs(domain, apiKey string) (int, []string, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.GetIPs(true)
 }

.. code-block:: node

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.get('ips', function (error, body) {
   console.log(body);
 });

