
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -X DELETE -G \
      https://api.mailgun.net/v3/inbox/tests/TEST_ID

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode deleteInboxPlacementTest() throws UnirestException {

         HttpResponse<JsonNode> request = Unirest.delete("https://api.mailgun.net/v3/inbox/tests/{test_id}")
             .basicAuth("api", API_KEY)
             .asJson();

         return request.getBody();
     }
 }

.. code-block:: php

  # Currently, the PHP SDK does not support the inbox placement endpoint.
  # Consider using the following php curl function.
  function delete_inbox_placement_test() {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v3/inbox/tests/TEST_ID');
    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: py

 def delete_inbox_placement_test():
     return requests.delete(
         "https://api.mailgun.net/v3/inbox/tests/TEST_ID",
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def delete_inbox_placement_test
   RestClient.delete("https://api:YOUR_API_KEY"\
                     "@api.mailgun.net/v3/inbox/tests/TEST_ID"\
                     {|response, request, result| response }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class InboxPlacementTest
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetInboxPlacementTest().Content.ToString());
     }

     public static IRestResponse DeleteInboxPlacementTest()
     {
         RestClient client = new RestClient();
         client.BaseUrl = new Uri("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest(Method.DELETE);
         request.AddParameter ("test_id", "TEST_ID", ParameterType.UrlSegment);
         request.Resource = "/inbox/tests/{test_id}";
         return client.Execute(request);
     }

 }
