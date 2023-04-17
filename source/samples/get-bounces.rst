
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -G \
     https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/bounces

.. code-block:: java

    import com.mailgun.api.v3.suppression.MailgunSuppressionBouncesApi;
    import com.mailgun.model.suppression.bounces.BouncesResponse;

    // ...

    public BouncesResponse getBounces() {
        MailgunSuppressionBouncesApi suppressionBouncesApi = MailgunClient.config(API_KEY)
            .createApi(MailgunSuppressionBouncesApi.class);

        return suppressionBouncesApi.getBounces(YOUR_DOMAIN_NAME);
    }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $domain   = 'YOUR_DOMAIN_NAME';

  # Issue the call to the client.
  $result = $mgClient->suppressions()->bounces()->index($domain);

.. code-block:: py

 def get_bounces():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/bounces",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_bounces
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/bounces"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetBouncesChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetBounces ().Content.ToString ());
     }

     public static IRestResponse GetBounces ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "{domain}/bounces";
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func ListBounces(domain, apiKey string) ([]mailgun.Bounce, error) {
     mg := mailgun.NewMailgun(domain, apiKey)
     it := mg.ListBounces(nil)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     var page, result []mailgun.Bounce
     for it.Next(ctx, &page) {
         result = append(result, page...)
     }

     if it.Err() != nil {
         return nil, it.Err()
     }
     return result, nil
 }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  import formData from 'form-data';
  import Mailgun from 'mailgun.js';

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const bounces = await client.suppressions.list(DOMAIN, 'bounces');
      console.log('bounces', bounces);
    } catch (error) {
      console.error(error);
    }
  })();
