.. code-block:: bash

  curl -X POST https://api.mailgun.net/v4/inbox/seedlists \
    -F 'sending_domains=domain.com' \
    --user 'api:<YOUR_API_KEY>'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode createSeedList() throws UnirestException {

         HttpResponse <JsonNode> request = Unirest.post("https://api.mailgun.net/v4/inbox/seedlists")
             .basicAuth("api", API_KEY)
             .field("sending_domains", "domain.com")
             .asJson();

         return request.getBody();
     }
 }

.. code-block:: php

  # Currently, the PHP SDK does not support the inbox placement endpoint.
  # Consider using the following php curl function.
  function create_seed_list() {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v4/inbox/seedlists');
    curl_setopt($ch, CURLOPT_POSTFIELDS, array(
        'sending_domains'=> 'domain.com',
        )
    );

    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: py

 def create_seed_list():
     data = {'sending_domains': 'domain.com'}
     return requests.post(
         "https://api.mailgun.net/v4/inbox/seedlists", data=data
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def create_seed_list
   data = {'sending_domains'=> 'domain.com' }
   RestClient.post("https://api:YOUR_API_KEY" \
                   "@api.mailgun.net/v4/inbox/seedlists",
                   fields_hash.merge(data))
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class CreateInboxPlacementTest
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (CreateSeedList ().Content.ToString ());
     }

     public static IRestResponse CreateSeedList ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/seedlists");
         client.Authenticator =
             new HttpBasicAuthenticator ("api", "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("sending_domains", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "inbox/seedlists";
         request.Method = Method.POST;
         return client.Execute (request);
     }
 }

