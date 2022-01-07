
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -G \
      https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode getMailingListValidation() throws UnirestException {

         HttpResponse<JsonNode> request = Unirest.post("https://api.mailgun.net/v3/lists/{list}@{domain}/validate")
             .basicAuth("api", API_KEY)
             .asJson();

         return request.getBody();
     }
 }

.. code-block:: php

  # Currently, the PHP SDK does not support Mailing List verifications.
  # Consider using the following php curl function.
  function get_mailing_list_validation() {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/validate');

    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: py

 def get_mailing_list_validation_status():
     return requests.get(
         "https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/validate",
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def get_mailing_list_validation_status
   RestClient.get("https://api:YOUR_API_KEY"\
                  "@api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/validate"\
                  {|response, request, result| response }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetMailingListValidationChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetMailingListValidation ().Content.ToString ());
     }

     public static IRestResponse GetMailingListValidation ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("list", "LIST@YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "/lists/{list}/validate";
         return client.Execute (request);
     }

 }
