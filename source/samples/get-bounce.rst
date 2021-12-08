
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -G \
      https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/bounces/foo@bar.com

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode getSingleBounce() throws UnirestException {

         HttpResponse <JsonNode> request = Unirest.get("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/bounces/foo@bar.com")
             .basicAuth("api", API_KEY)
             .asJson();

         return request.getBody();
     }
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient  = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $domain    = 'YOUR_DOMAIN_NAME';
  $recipient = 'bob@example.com';

  # Issue the call to the client.
  $result = $mgClient->suppressions()->bounces()->show($domain, $recipient);

.. code-block:: py

 def get_bounce():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/bounces/foo@bar.com",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_bounce
   RestClient.get("https://api:YOUR_API_KEY"\
                  "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/bounces"\
                  "/foo@bar.com"){|response, request, result| response }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetBounceChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetBounce ().Content.ToString ());
     }

     public static IRestResponse GetBounce ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "{domain}/bounces/foo@bar.com";
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func GetBounce(domain, apiKey string) (mailgun.Bounce, error) {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.GetBounce(ctx, "foo@bar.com")
 }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const bouncesForAddress = await client.suppressions.get(DOMAIN, 'bounces', 'foo@bar.com');
      console.log('bouncesForAddress', bouncesForAddress);
    } catch (error) {
      console.error(error);
    }
  })();


