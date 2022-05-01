
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' \
      https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/bounces \
      -F address='bob@example.com'

.. code-block:: java

    import com.mailgun.api.v3.suppression.MailgunSuppressionBouncesApi;
    import com.mailgun.model.suppression.SuppressionResponse;
    import com.mailgun.model.suppression.bounces.BouncesRequest;

    import java.time.ZonedDateTime;

    // ...

    public SuppressionResponse addBounce() {
        MailgunSuppressionBouncesApi suppressionBouncesApi = MailgunClient.config(API_KEY)
            .createApi(MailgunSuppressionBouncesApi.class);

        BouncesRequest bouncesRequest = BouncesRequest.builder()
            .address("bob@example.com")
            .code("550")
            .error(ERROR_MESSAGE)
            .createdAt(ZonedDateTime.now())
            .build();

        return suppressionBouncesApi.addBounce(YOUR_DOMAIN_NAME, bouncesRequest);
    }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $domain   = 'YOUR_DOMAIN_NAME';
  $recipient = 'bob@example.com';

  # Issue the call to the client.
  $result = $mgClient->suppressions()->bounces()->create($domain, $recipient);

.. code-block:: py

 def add_bounce():
     return requests.post(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/bounces",
         auth=("api", "YOUR_API_KEY"),
         data={'address':'bob@example.com'})

.. code-block:: rb

 def add_bounce
   RestClient.post("https://api:YOUR_API_KEY"\
                   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/bounces",
                   :address => 'bob@example.com')
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class AddBounceChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (AddBounce ().Content.ToString ());
     }

     public static IRestResponse AddBounce ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "{domain}/bounces";
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.AddParameter ("address", "bob@example.com");
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

 func AddBounce(domain, apiKey string) error {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.AddBounce(ctx, "bob@example.com", "550", "Undeliverable message error")
 }

.. code-block:: js

    const DOMAIN = 'YOUR_DOMAIN_NAME';

    const formData = require('form-data');
    const Mailgun = require('mailgun.js');

    const mailgun = new Mailgun(formData);

    const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
    (async () => {
        try {
            const createdBounce = await client.suppressions.create(DOMAIN, 'bounces', { address: 'bob@example.com' });
            console.log('createdBounce', createdBounce);
        } catch (error) {
            console.error(error);
        }
    })();
