.. code-block:: bash

  curl -X PUT https://api.mailgun.net/v4/inbox/seedlists/TARGET_EMAIL \
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

         HttpResponse <JsonNode> request = Unirest.put("https://api.mailgun.net/v4/inbox/seedlists/TARGET_EMAIL")
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

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v4/inbox/seedlists/TARGET_EMAIL');
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
     return requests.put(
         "https://api.mailgun.net/v4/inbox/seedlists/TARGET_EMAIL", data=data
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def create_seed_list
   data = {'sending_domains'=> 'domain.com' }
   RestClient.put("https://api:YOUR_API_KEY" \
                   "@api.mailgun.net/v4/inbox/seedlists/TARGET_EMAIL",
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
         client.BaseUrl = new Uri ("https://api.mailgun.net/v4");
         client.Authenticator =
             new HttpBasicAuthenticator ("api", "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("sending_domains", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "inbox/seedlists/TARGET_EMAIL";
         request.Method = Method.PUT;
         return client.Execute (request);
     }
 }

