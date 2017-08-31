.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/webhooks \
	-F id='click' \
	-F url='http://bin.example.com/8de4a9c4'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode addWebhook() throws UnirestException {
 
         HttpResponse <JsonNode> request = Unirest.post("https://api.mailgun.net/v3/domains/" + YOUR_DOMAIN_NAME + "/webhooks")
 		      .basicAuth("api", API_KEY)
 			  .field("id","click")
 		      .field("url", "http://bin.example.com/8de4a9c4")
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
  $result = $mgClient->post("domains/$domain/webhooks", array(
      'id'  => 'click',
      'url' => 'http://bin.example.com/8de4a9c4'
  ));

.. code-block:: py

 def add_webhook():
     return requests.post(
         "https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/webhooks",
         auth=("api", "YOUR_API_KEY"),
         data={'id':'click', 'url':'http://bin.example.com/8de4a9c4'})

.. code-block:: rb

 def add_webhook
   RestClient.post("https://api:YOUR_API_KEY"\
                   "@api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/webhooks",
                   :id => 'click',
                   :url => 'http://bin.example.com/8de4a9c4')
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class AddWebhookChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (AddWebhook ().Content.ToString ());
     }

     public static IRestResponse AddWebhook ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3/");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "domains/YOUR_DOMAIN_NAME/webhooks";
         request.AddParameter ("id", "click");
         request.AddParameter ("url", "http://bin.example.com/8de4a9c4");
         request.Method = Method.POST;
         return client.Execute (request);
     }

 }

.. code-block:: go

 func CreateWebhook(domain, apiKey string) error {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.CreateWebhook("deliver", "http://www.example.com")
 }

.. code-block:: node

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.post(`/domain/${DOMAIN}/webhooks`, {"id": 'click', "url": 'http://bin.example.com/8de4a9c4'}, function (error, body) {
   console.log(body);
 });
