.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' \
     https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/webhooks \
     -F id='click' \
     -F url='http://bin.example.com/8de4a9c4'

.. code-block:: java

    import com.mailgun.api.v3.MailgunWebhooksApi;
    import com.mailgun.enums.WebhookName;
    import com.mailgun.model.webhooks.WebhookRequest;
    import com.mailgun.model.webhooks.WebhookResult;

    import java.util.List;

    // ...

    public WebhookResult addWebhook() {
        MailgunWebhooksApi mailgunWebhooksApi = MailgunClient.config(API_KEY).createApi(MailgunWebhooksApi.class);

        WebhookRequest request = WebhookRequest.builder()
            .webhookName(WebhookName.CLICKED)
            .url("https://your_domain.com/v1/clicked")
            .urls(List.of("https://your_domain.com/v2/clicked", "https://your_partner_domain.com/v1/clicked"))
            .build();

        return mailgunWebhooksApi.createNewWebhook(YOUR_DOMAIN_NAME, request);
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
  $result = $mgClient->webhooks()->create($domain, $webhook, $destination_url);

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

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func CreateWebhook(domain, apiKey string) error {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.CreateWebhook(ctx, "clicked", []string{"https://your_domain.com/v1/clicked"})
 }

.. code-block:: js

 // deprecated
 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.post(`/domain/${DOMAIN}/webhooks`, {"id": 'click', "url": 'http://bin.example.com/8de4a9c4'}, function (error, body) {
   console.log(body);
 });
