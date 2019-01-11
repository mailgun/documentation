
.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' -X DELETE \
     https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/webhooks/clicked

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode deleteWebhook() throws UnirestException {
 
         HttpResponse <JsonNode> request = Unirest.delete("https://api.mailgun.net/v3/domains/" + YOUR_DOMAIN_NAME + "/webhooks/clicked")
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
  $result = $mgClient->delete("$domain/webhooks/clicked");

.. code-block:: py

 def delete_domain():
     return requests.delete(
         "https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/webhooks/clicked",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def delete_domain
   RestClient.delete "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/webhooks/clicked"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class DeleteWebhookChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (DeleteWebhook ().Content.ToString ());
     }

     public static IRestResponse DeleteWebhook ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "/domains/{name}/webhooks/clicked";
         request.AddUrlSegment ("name", "YOUR_DOMAIN_NAME");
         request.Method = Method.DELETE;
         return client.Execute (request);
     }

 }

.. code-block:: go

 func DeleteWebhook(t *testing.T) {
   mg := mailgun.NewMailgun(domain, apiKey)
   return mg.DeleteWebhook("clicked")
 }

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.delete(`/domains/${DOMAIN}/webhooks/clicked`, function (error, body) {
   console.log(body);
 });
