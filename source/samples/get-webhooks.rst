
.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' -G \
     https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/webhooks

.. code-block:: java

    import com.mailgun.api.v3.MailgunWebhooksApi;
    import com.mailgun.model.webhooks.WebhookListResult;;

    // ...

    public WebhookListResult getWebhooks() {
        MailgunWebhooksApi mailgunWebhooksApi = MailgunClient.config(API_KEY).createApi(MailgunWebhooksApi.class);

        return mailgunWebhooksApi.getAllWebhooks(YOUR_DOMAIN_NAME);
    }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $domain   = 'YOUR_DOMAIN_NAME';

  # Issue the call to the client.
  $result = $mgClient->webhooks()->index($domain)


.. code-block:: py

 def get_bounces():
     return requests.get(
         "https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/webhooks",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_webhooks
   RestClient.get "https://api:YOUR_API_KEY"\
                  "@api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/webhooks"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetWebhooksChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetWebhooks ().Content.ToString ());
     }

     public static IRestResponse GetWebhooks ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "domains/{domain}/webhooks";
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func ListWebhooks(domain, apiKey string) (map[string]string, error) {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.ListWebhooks(ctx)
 }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  import formData from 'form-data';
  import Mailgun from 'mailgun.js';

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const webhooks = await client.webhooks.list(DOMAIN);
      console.log('webhooks', webhooks);
    } catch (error) {
      console.error(error);
    }
  })();

