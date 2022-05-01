.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -X POST \
     https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/webhooks \
     -F id='clicked' \
     -F url='https://your_domain.com/v1/clicked' \
     -F url='https://your_domain.com/v2/clicked' \
     -F url='https://your_partner_domain.com/v1/clicked'

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
         data={
           'id':'clicked',
           'url':[ 'https://your_domain.com/v1/clicked',
           'https://your_domain.com/v2/clicked',
           'https://your_partner_domain.com/v1/clicked'
           ]
         })

.. code-block:: rb

 def add_webhook
   RestClient.post("https://api:YOUR_API_KEY"\
                   "@api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/webhooks",
                   :id => 'clicked',
                   :url => ['https://your_domain.com/v1/clicked',
                            'https://your_domain.com/v2/clicked',
                            'https://your_partner_domain.com/v1/clicked'])
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
         request.AddParameter ("id", "clicked");
         request.AddParameter ("url", "https://your_domain.com/v1/clicked")
         request.AddParameter ("url", "https://your_domain.com/v2/clicked")
         request.AddParameter ("url", "https://your_partner_domain.com/v1/clicked")
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

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      // clicked or one of the Supported webhooks
      const createdWebhook = await client.webhooks.create(DOMAIN, 'clicked', 'https://your_domain.com/v1/clicked');
      console.log('createdWebhook', createdWebhook);
    } catch (error) {
        console.error(error);
    }
  })();
