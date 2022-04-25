
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -G \
      https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/ips

.. code-block:: java

    import com.mailgun.api.v3.MailgunIPsApi;
    import com.mailgun.model.ips.IPsResult;

    // ...

    public IPsResult getDomainIPs() {
        MailgunIPsApi mailgunIPsApi = MailgunClient.config(API_KEY)
            .createApi(MailgunIPsApi.class);

        return mailgunIPsApi.getDomainIPs(YOUR_DOMAIN_NAME);
    }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $domain = "YOUR_DOMAIN_NAME";

  # Issue the call to the client.
  $result = $mgClient->ips()->domainIndex($domain);

.. code-block:: py

 def get_domain_ips():
     return requests.get(
         "https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/ips",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_domain_ips
   RestClient.get("https://api:YOUR_API_KEY"\
                  "@api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/ips"\
                  {|response, request, result| response }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetDomainIPsChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetDomainIPs ().Content.ToString ());
     }

     public static IRestResponse GetDomainIPs ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "/domains/{domain}/ips";
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func ListDomainIPS(domain, apiKey string) ([]mailgun.IPAddress, error) {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.ListDomainIPS(ctx)
 }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const getIps = await client.domains.getIps(DOMAIN);
      console.log('getIps', getIps);
    } catch (error) {
      console.error(error);
    }
  })();
