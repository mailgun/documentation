
.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' -G \
     https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/tracking

.. code-block:: java

    import com.mailgun.api.v3.MailgunDomainsApi;
    import com.mailgun.model.domains.DomainTrackingResponse;

    // ...

    public DomainTrackingResponse getDomainTracking() {
        MailgunDomainsApi mailgunDomainsApi = MailgunClient.config(API_KEY)
            .createApi(MailgunDomainsApi.class);

        return mailgunDomainsApi.getDomainTrackingSettings(YOUR_DOMAIN_NAME);
    }

.. code-block:: php

  # Currently, the PHP SDK does not support Mailing List verifications.
  # Consider using the following php curl function.
  function get_domain_tracking_settings() {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/tracking');

    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: py

 def get_domain_tracking():
     return requests.get(
         "https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/tracking",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_domain_tracking
   RestClient.get("https://api:YOUR_API_KEY"\
                  "@api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/tracking"\
                  {|response, request, result| response }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetDomainTrackingChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetDomainTracking ().Content.ToString ());
     }

     public static IRestResponse GetDomainTracking ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "/domains/{domain}/tracking";
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func GetDomainTracking(domain, apiKey string) (mailgun.DomainTracking, error) {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.GetDomainTracking(ctx, domain)
 }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const tracking = await client.domains.getTracking(DOMAIN);
      console.log('tracking', tracking);
    } catch (error) {
      console.error(error);
    }
  })();

