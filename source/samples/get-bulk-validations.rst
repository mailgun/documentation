
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -G \
      https://api.mailgun.net/v4/address/validate/bulk

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode getMailingListValidation() throws UnirestException {

         HttpResponse<JsonNode> request = Unirest.get("https://api.mailgun.net/v4/address/validate/bulk")
             .basicAuth("api", API_KEY)
             .queryString("limit", 2)
             .asJson();

         return request.getBody();
     }
 }

.. code-block:: php

  # Currently, the PHP SDK does not support the v4 Validations endpoint.
  # Consider using the following php curl function.
  function get_bulk_validations() {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v4/address/validate/bulk?limit=2');
    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: py

 def get_mailing_list_validation_status():
     return requests.get(
         "https://api.mailgun.net/v4/address/validate/bulk",
         auth=('api', 'YOUR_API_KEY'),
         params={"limit": 2})

.. code-block:: rb

 def get_mailing_list_validation_status
   RestClient.get("https://api:YOUR_API_KEY"\
                  "@api.mailgun.net/v4/address/validate/bulk"\,
                  {params: {limit: 2}}
                  {|response, request, result| response }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetBulkValidationsChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetBulkValidations ().Content.ToString ());
     }

     public static IRestResponse GetBulkValidation ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v4");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "/address/validate/bulk";
         request.AddParameter ("limit", 2);
         return client.Execute (request);
     }

 }
