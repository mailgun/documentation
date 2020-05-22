
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -X DELETE \
      https://api.mailgun.net/v4/address/validate/preview/LIST_NAME

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode cancelBulkPreview() throws UnirestException {
         url = "https://api.mailgun.net/v4/address/validate/preview/LIST_NAME"
         HttpResponse <JsonNode> request = Unirest.delete(url)
             .basicAuth("api", API_KEY)
             .asJson();

         return request.getBody();
     }
 }

.. code-block:: php

  # Currently, the PHP SDK does not support the v4 Validations endpoint.
  # Consider using the following php curl function.
  function delete_bulk_preview() {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v4/address/validate/preview/LIST_NAME');
    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: py

 def delete_bulk_preview():
     return requests.delete(
         ("https://api.mailgun.net/v4/address/validate/preview/LIST_NAME"),
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def delete_bulk_preview
   RestClient.delete("https://api:YOUR_API_KEY" \
                     "@api.mailgun.net/v4/address/validate/preview/LIST_NAME")
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class DeleteBulkPreview
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (DeletePreview ().Content.ToString ());
     }

     public static IRestResponse DeletePreview()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v4");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "address/validate/preview/{list}";
         request.AddParameter ("list", "LIST_NAME",
                               ParameterType.UrlSegment);
         request.Method = Method.DELETE;
         return client.Execute (request);
     }

 }
