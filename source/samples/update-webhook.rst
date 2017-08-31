
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -X PUT \
	https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/webhooks/click \
	-F url='http://google.com'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode updateWebhook() throws UnirestException {

         HttpResponse <JsonNode> request = Unirest.put("https://api.mailgun.net/v3/domains/" + YOUR_DOMAIN_NAME + "/webhooks/click")
             .basicAuth("api", API_KEY)
             .field("url", "http://google.com")
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
  $listAddress = 'YOUR_DOMAIN_NAME';
  $memberAddress = 'bob@example.com';

  # Issue the call to the client.
  $result = $mgClient->put("$domain/webhooks/click", array(
      'url' => 'http://google.com'
  ));

.. code-block:: py

 def update_member():
     return requests.put(
         ("https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/webhooks/click"),
         auth=('api', 'YOUR_API_KEY'),
         data={'url': 'http://google.com'})

.. code-block:: rb

 def update_member
   RestClient.put("https://api:YOUR_API_KEY" \
                  "@api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/webhooks/click" \
                  "/bar@example.com",
                  :url => 'http://google.com')
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class UpdateWebhookChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (UpdateWebhook ().Content.ToString ());
     }

     public static IRestResponse UpdateWebhook ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "/domains/YOUR_DOMAIN_NAME/webhooks/click";
         request.AddParameter ("url", "http://google.com");
         request.Method = Method.PUT;
         return client.Execute (request);
     }

 }

.. code-block:: go

 func UpdateWebhook(domain, apiKey string) error {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.UpdateWebhook("deliver", "http://api.example.com")
 }

.. code-block:: node

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.put(`/domain/${DOMAIN}/webhooks/click`, {"url": 'http://google.com'}, function (error, body) {
   console.log(body);
 });
