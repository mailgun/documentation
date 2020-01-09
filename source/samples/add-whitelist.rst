
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' \
      https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/whitelists \
      -F domain='example.com'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode addBounce() throws UnirestException {

         HttpResponse <JsonNode> request =  Unirest.post("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/whitelists")
             .basicAuth("api", API_KEY)
             .field("domain", "example.com")
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

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.post(`/${DOMAIN}/whitelists`, {'domain': 'example.com'}, function (error, body) {
   console.log(body);
 });
