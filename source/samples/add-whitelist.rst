
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' \
      https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/whitelists \
      -F domain='example.com'

.. code-block:: java

    import com.mailgun.api.v3.suppression.MailgunSuppressionWhitelistsApi;
    import com.mailgun.model.ResponseWithMessage;
    import com.mailgun.model.suppression.whitelists.WhitelistsRequest;

    // ...

    public ResponseWithMessage addBounce() {
        MailgunSuppressionWhitelistsApi suppressionWhitelistsApi = MailgunClient.config(API_KEY)
            .createApi(MailgunSuppressionWhitelistsApi.class);

        WhitelistsRequest whitelistsRequest = WhitelistsRequest.builder()
            .address("bob@example.com")
            .reason(REASON)
            .build();

        return suppressionWhitelistsApi.addSingleWhitelistRecord(YOUR_DOMAIN_NAME, whitelistsRequest);
    }

.. code-block:: php

  # Currently, the PHP SDK does not support Suppression Whiteslist endpoint.
  # Consider using the following php curl function.
  function add_domain_whitelist() {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/whitelists');
    curl_setopt($ch, CURLOPT_POSTFIELDS, array(
        'address'=> 'bob@example.com')
    );

    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: py

 def add_whitelist():
     return requests.post(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/whitelists",
         auth=("api", "YOUR_API_KEY"),
         data={'address':'example.com'})

.. code-block:: rb

 def add_whitelist
   RestClient.post("https://api:YOUR_API_KEY"\
                   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/whitelists",
                   :domain => 'example.com')
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
         request.Resource = "{domain}/whitelists";
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.AddParameter ("domain", "example.com");
         request.Method = Method.POST;
         return client.Execute (request);
     }

 }

.. code-block:: go

    // Not implemented

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const createdWhitelist = await client.suppressions.create(DOMAIN, 'whitelists', { domain: 'example.com' });
      console.log('createdWhitelist', createdWhitelist);
    } catch (error) {
        console.error(error);
    }
  })();

