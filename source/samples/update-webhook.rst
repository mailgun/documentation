
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -X PUT \
      https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/webhooks/clicked \
      -F url='https://your_domain,com/v1/clicked'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode updateWebhook() throws UnirestException {

         HttpResponse <JsonNode> request = Unirest.put("https://api.mailgun.net/v3/domains/" + YOUR_DOMAIN_NAME + "/webhooks/clicked")
             .basicAuth("api", API_KEY)
             .field("url", "https://your_domain.com/clicked")
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
  $domain   = 'YOUR_DOMAIN_NAME';
  $webhook  = 'delivered';
  $destination_url = 'https://my.webhook.url/delivered'

  # Issue the call to the client.
  $result = $mgClient->webhooks()->update($domain, $webhook, $destination_url);

.. code-block:: py

 def update_webhook():
     return requests.put(
         ("https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/webhooks/clicked"),
         auth=('api', 'YOUR_API_KEY'),
         data={'url': 'https://your_domain.com/clicked'})

.. code-block:: rb

 def update_webhook
   RestClient.put("https://api:YOUR_API_KEY" \
                  "@api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/webhooks/clicked",
                  :url => 'https://your_domain.com/clicked')
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
         request.Resource = "/domains/YOUR_DOMAIN_NAME/webhooks/clicked";
         request.AddParameter ("url", "https://your_domain.com/clicked");
         request.Method = Method.PUT;
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func UpdateWebhook(domain, apiKey string) error {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.UpdateWebhook(ctx, "clicked", []string{"https://your_domain.com/clicked"})
 }

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.put(`/domain/${DOMAIN}/webhooks/clicked`, {"url": 'https://your_domain.com/v1/clicked'}, function (error, body) {
   console.log(body);
 });
