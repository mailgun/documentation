
.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' -X DELETE \
     https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/credentials/alice

.. code-block:: java

 import com.mailgun.api.v3.MailgunDomainsApi;
 import com.mailgun.model.ResponseWithMessage;

    // ...

    public ResponseWithMessage deleteCredentials() {
        MailgunDomainsApi mailgunDomainsApi = MailgunClient.config(API_KEY)
            .createApi(MailgunDomainsApi.class);

        return mailgunDomainsApi.deleteCredentials(YOUR_DOMAIN_NAME, YOUR_LOGIN);
    }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $domain   = 'YOUR_DOMAIN_NAME';
  $smtpUser = 'bob';

  # Issue the call to the client.
  $result = $mgClient->domains()->deleteCredential($domain, $smtpUser);

.. code-block:: py

 def delete_credentials():
     return requests.delete(
         "https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/credentials/alice",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def delete_credentials
   RestClient.delete "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/credentials/alice"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class DeleteCredentialsChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (DeleteCredentials ().Content.ToString ());
     }

     public static IRestResponse DeleteCredentials ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "domains/{domain}/credentials/{login}";
         request.AddUrlSegment ("login", "alice");
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

 func DeleteCredential(domain, apiKey string) error {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.DeleteCredential(ctx, "alice")
 }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  import formData from 'form-data';
  import Mailgun from 'mailgun.js';

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const deletedDomainCredentials = await client.domains.domainCredentials.destroy(DOMAIN, 'alice@YOUR_DOMAIN_NAME');
      console.log('deletedDomainCredentials', deletedDomainCredentials);
    } catch (error) {
      console.error(error);
    }
  })();
