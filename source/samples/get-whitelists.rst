
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -G \
     https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/whitelists

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode getBounces() throws UnirestException {

         HttpResponse <JsonNode> request = Unirest.get("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/whitelists")
             .basicAuth("api", API_KEY)
             .asJson();

         return request.getBody();
     }
 }

.. code-block:: php

  # Currently, the PHP SDK does not support Suppression Whiteslist endpoint.
  # Consider using the following php curl function.
  function add_domain_whitelist() {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v3/domain.tld/whitelists');
    curl_setopt($ch, CURLOPT_POSTFIELDS, array(
        'address'=> 'bob@example.com')
    );

    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: py

 def get_whitelists():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/whitelists",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_whitelists
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/whitelists"
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
         request.Resource = "{domain}/whitelists";
         return client.Execute (request);
     }

 }

.. code-block:: go

    // Not supported yet

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const whitelists = await client.suppressions.list(DOMAIN, 'whitelists');
      console.log('whitelists', whitelists);
    } catch (error) {
      console.error(error);
    }
  })();
