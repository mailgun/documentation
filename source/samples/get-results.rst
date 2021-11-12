
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -G \
      https://api.mailgun.net/v4/inbox/results

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode getResults() throws UnirestException {

         HttpResponse<JsonNode> request = Unirest.get("https://api.mailgun.net/v4/inbox/results")
             .basicAuth("api", API_KEY)
             .asJson();

         return request.getBody();
     }
 }

.. code-block:: php

  # Currently, the PHP SDK does not support the Inbox Placement endpoint.
  # Consider using the following php curl function.
  function get_results() {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v4/inbox/results');
    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: py

 def get_results():
     return requests.get(
         "https://api.mailgun.net/v4/inbox/results",
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def get_results
   RestClient.get("https://api:YOUR_API_KEY"\
                  "@api.mailgun.net/v4/inbox/results"\
                  {|response, request, result| response }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class InboxPlacementTests
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetResults ().Content.ToString ());
     }

     public static IRestResponse GetResults ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v4");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "/inbox/results";
         return client.Execute (request);
     }

 }

