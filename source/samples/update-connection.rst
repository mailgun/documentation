
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -X PUT \
      https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/connection
      -F require_tls='true' \
      -F skip_verification='false'

.. code-block:: java

    import com.mailgun.api.v3.MailgunDomainsApi;
    import com.mailgun.model.domains.DomainConnectionRequest;
    import com.mailgun.model.domains.UpdateDomainConnectionResponse;

    // ...

    public UpdateDomainConnectionResponse updateConnections() {
        MailgunDomainsApi mailgunDomainsApi = MailgunClient.config(API_KEY)
            .createApi(MailgunDomainsApi.class);

        DomainConnectionRequest domainConnection = DomainConnectionRequest.builder()
            .requireTls(true)
            .skipVerification(false)
            .build();

        return mailgunDomainsApi.updateDomainConnectionSettings(YOUR_DOMAIN_NAME, domainConnection);
    }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $domain = "YOUR_DOMAIN_NAME";
  $require_tls = true;
  $skip_verification = false;

  # Issue the call to the client.
  $result = $mgClient->domains()->updateConnection($domain, $require_tls, $skip_verification);

.. code-block:: py

 def update_connection():
     return requests.put(
         ("https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/connection"),
         auth=('api', 'YOUR_API_KEY'),
         data={'require_tls': True,
               'skip_verification': False})

.. code-block:: rb

 def update_member
   RestClient.put("https://api:YOUR_API_KEY" \
                  "@api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/connection",
                  :require_tls => true,
                  :skip_verification => false)
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class UpdateConnectionChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (UpdateConnection ().Content.ToString ());
     }

     public static IRestResponse UpdateConnection ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "domains/YOUR_DOMAIN_NAME/connection";
         request.AddParameter ("require_tls", true);
         request.AddParameter ("skip_verification", false);
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

 func UpdateDomainConnection(domain, apiKey string) error {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.UpdateDomainConnection(ctx, domain, mailgun.DomainConnection{
         RequireTLS:       true,
         SkipVerification: true,
     })
 }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  import formData from 'form-data';
  import Mailgun from 'mailgun.js';

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const updatedConnection = await client.domains.updateConnection('DOMAIN', {
          require_tls: true,
          skip_verification: false
      });
      console.log('updatedConnection', updatedConnection);
    } catch (error) {
      console.error(error);
    }
  })();
