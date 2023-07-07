
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -X PUT \
      https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/webhooks/click \
      -F url='http://google.com'

.. code-block:: java

    import com.mailgun.api.v3.MailgunWebhooksApi;
    import com.mailgun.enums.WebhookName;
    import com.mailgun.model.webhooks.WebhookResult;
    import com.mailgun.model.webhooks.WebhookUpdateRequest;

    // ...

    public WebhookResult updateWebhook() {
        MailgunWebhooksApi mailgunWebhooksApi = MailgunClient.config(API_KEY)
            .createApi(MailgunWebhooksApi.class);

        WebhookUpdateRequest request = WebhookUpdateRequest.builder()
            .url("https://your_domain.com/clicked")
            .build();

        return mailgunWebhooksApi.updateWebhook(YOUR_DOMAIN_NAME, WebhookName.CLICKED, request);
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

 // This feature is deprecated and not supported in the js library
