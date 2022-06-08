
.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' -X DELETE \
     https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/webhooks/clicked

.. code-block:: java

    import com.mailgun.api.v3.MailgunWebhooksApi;
    import com.mailgun.enums.WebhookName;
    import com.mailgun.model.webhooks.WebhookResult;

    // ...

    public WebhookResult deleteWebhook() {
        MailgunWebhooksApi mailgunWebhooksApi = MailgunClient.config(API_KEY).createApi(MailgunWebhooksApi.class);

        return mailgunWebhooksApi.deleteWebhook(YOUR_DOMAIN_NAME, WebhookName.CLICKED);
    }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $domain   = 'YOUR_DOMAIN_NAME';
  $webhook  = 'delivered';

  # Issue the call to the client.
  $result = $mgClient->webhooks()->delete($domain, $webhook);

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

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func DeleteWebhook(domain, apiKey string) error {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.DeleteWebhook(ctx, "clicked")
 }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const deletedWebhook = await client.webhooks.destroy(DOMAIN, 'clicked');
      console.log('deletedWebhook', deletedWebhook);
    } catch (error) {
      console.error(error);
    }
  })();
