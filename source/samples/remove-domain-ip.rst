
.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' -X DELETE \
     https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/ips/127.0.0.1

.. code-block:: java

    import com.mailgun.api.v3.MailgunIPsApi;
    import com.mailgun.model.ResponseWithMessage

    // ...

    public ResponseWithMessage deleteDomainIP() {
        MailgunIPsApi mailgunIPsApi = MailgunClient.config(API_KEY).createApi(MailgunIPsApi.class);

        return mailgunIPsApi.unassignIPFromDomain(YOUR_DOMAIN_NAME, "127.0.0.1");
    }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $domain   = 'YOUR_DOMAIN_NAME';
  $ip       = '127.0.0.1';

  # Issue the call to the client.
  $result = $mgClient->ips->unassign($domain, $ip);

.. code-block:: py

 def delete_domain_ip():
     return requests.delete(
         "https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/ips/127.0.0.1",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def delete_domain_ip
   RestClient.delete "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/ips/127.0.0.1"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class DeleteDomainIPChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (DeleteDomainIP ().Content.ToString ());
     }

     public static IRestResponse DeleteDomainIP ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "{domain}/ips/{ip}";
         request.AddUrlSegment ("ip", "127.0.0.1");
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

 func DeleteDomainIP(domain, apiKey string) error {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.DeleteDomainIP(ctx, "127.0.0.1")
 }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const deletedIp = await client.domains.deleteIp(DOMAIN, '127.0.0.1');
      console.log('deletedIp', deletedIp);
    } catch (error) {
      console.error(error);
    }
  })();
