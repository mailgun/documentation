
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -X DELETE \
      https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members/bar@example.com

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode cancelMailingListValidation() throws UnirestException {

         HttpResponse <JsonNode> request = Unirest.delete("https://api.mailgun.net/v3/lists/YoungJustice@example.com/validate")
             .basicAuth("api", API_KEY)
             .asJson();

         return request.getBody();
     }
 }

.. code-block:: php

  # Currently, the PHP SDK does not support Mailing List validations.
  # Consider using the following php curl function.
  function delete_mailing_list_validation() {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/validate');

    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: py

 def cancel_mailing_list_validation():
     return requests.delete(
         ("https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/validate"),
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def cancel_mailing_list_validation
   RestClient.delete("https://api:YOUR_API_KEY" \
                     "@api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/validate" \
                     "/bar@example.com")
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class DeleteMailingListValidationChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (CancelMailingListValidation ().Content.ToString ());
     }

     public static IRestResponse CancelMailingListValidation()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "lists/{list}/validate}";
         request.AddParameter ("list", "LIST@YOUR_DOMAIN_NAME",
                               ParameterType.UrlSegment);
         request.Method = Method.DELETE;
         return client.Execute (request);
     }

 }
