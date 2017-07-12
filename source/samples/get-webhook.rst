
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
	https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/webhooks/click

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode getWebhookEvent() throws UnirestException{
   	     HttpResponse <JsonNode> request = Unirest.get("https://api.mailgun.net/v3/domains/" + YOUR_DOMAIN_NAME + "/webhooks/click")
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
  $result = $mgClient->get("$domain/webhooks/click");

.. code-block:: py

 def get_domain():
     return requests.get(
         "https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/webhooks/click",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_domain
   RestClient.get("https://api:YOUR_API_KEY"\
                  "@api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/webhooks/click"\
                  {|response, request, result| response }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetWebhookChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetWebhook ().Content.ToString ());
     }

     public static IRestResponse GetWebhook ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "/domains/{domain}/webhooks/click";
         return client.Execute (request);
     }

 }

.. code-block:: go

 func GetWebhook(domain, apiKey string) (string, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.GetWebhookByType("deliver")
 }

.. code-block:: node

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.get(`/domain/${DOMAIN}/webhooks/click`, function (error, body) {
   console.log(body);
 });
