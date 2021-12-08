
.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' -X DELETE \
     https://api.mailgun.net/v3/domains/example.mailgun.org

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode deleteDomain() throws UnirestException {

         HttpResponse<JsonNode> request = Unirest.delete("https://api.mailgun.net/v3/domains/domain.example.com")
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
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $domain   = 'YOUR_DOMAIN_NAME';

  # Issue the call to the client.
  $result = $mgClient->domains()->delete($domain);

.. code-block:: py

 def delete_domain():
     return requests.delete(
         "https://api.mailgun.net/v3/domains/example.mailgun.org",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def delete_domain
   RestClient.delete "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/domains/example.mailgun.org"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class DeleteDomainChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (DeleteDomain ().Content.ToString ());
     }

     public static IRestResponse DeleteDomain ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "/domains/{name}";
         request.AddUrlSegment ("name", "example.mailgun.org");
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

 func DeleteDomain(domain, apiKey string) error {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.DeleteDomain(ctx, "example.com")
 }

.. code-block:: js

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const destroyedDomain = await client.domains.destroy('DOMAIN_TO_DELETE');
      console.log('destroyedDomain', destroyedDomain);
    } catch (error) {
      console.error(error);
    }
  })();
