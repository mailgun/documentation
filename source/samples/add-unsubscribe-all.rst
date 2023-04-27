
.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' \
    https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/unsubscribes \
    -F address='bob@example.com' \
    -F tag='*'

.. code-block:: java

    import com.mailgun.api.v3.suppression.MailgunSuppressionUnsubscribeApi;
    import com.mailgun.model.suppression.SuppressionResponse;
    import com.mailgun.model.suppression.unsubscribe.UnsubscribeSingleItemRequest;

    import java.time.ZonedDateTime;

    // ...

    public SuppressionResponse addUnsubscribeAll() {
        MailgunSuppressionUnsubscribeApi suppressionUnsubscribeApi = MailgunClient.config(API_KEY)
            .createApi(MailgunSuppressionUnsubscribeApi.class);

        UnsubscribeSingleItemRequest unsubscribeSingleItemRequest = UnsubscribeSingleItemRequest.builder()
            .address("bob@example.com")
            .tag("*")
            .createdAt(ZonedDateTime.now())
            .build();

        return suppressionUnsubscribeApi.addAddressToUnsubscribeTable(YOUR_DOMAIN_NAME, unsubscribeSingleItemRequest);
    }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient  = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $domain    = 'YOUR_DOMAIN_NAME';
  $recipient = 'bob@example.com';
  $tag       = '*';

  # Issue the call to the client.
  $result = $mgClient->suppressions()->unsubscribes()->create($domain, $recipient, $tag);

.. code-block:: py

 def unsubscribe_from_all():
     return requests.post(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/unsubscribes",
         auth=("api", "YOUR_API_KEY"),
         data={'address':'bob@example.com', 'tag': '*'})

.. code-block:: rb

 def unsubscribe_from_all
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/unsubscribes",
   :address => 'bob@example.com',
   :tag => '*'
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class AddUnsubscribeAllChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (UnsubscribeFromAll ().Content.ToString ());
     }

     public static IRestResponse UnsubscribeFromAll ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "{domain}/unsubscribes";
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.AddParameter ("address", "bob@example.com");
         request.AddParameter ("tag", "*");
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

 func CreateUnsubscribe(domain, apiKey string) error {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.CreateUnsubscribe(ctx, "bob@example.com", "*")
 }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  import formData from 'form-data';
  import Mailgun from 'mailgun.js';

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
      try {
          const createdUnsubscribe = await client.suppressions.create(DOMAIN, 'unsubscribes', { address: 'bob@example.com', tag: '*' });
          console.log('createdUnsubscribe', createdUnsubscribe);
      } catch (error) {
          console.error(error);
      }
  })();
