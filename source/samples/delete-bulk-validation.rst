
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -X DELETE \
      https://api.mailgun.net/v4/address/validate/bulk/LIST_NAME

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode cancelMailingListValidation() throws UnirestException {
         url = "https://api.mailgun.net/v4/address/validate/bulk/LIST_NAME"
         HttpResponse <JsonNode> request = Unirest.delete(url)
             .basicAuth("api", API_KEY)
             .asJson();
 
         return request.getBody();
     }
 }

.. code-block:: py

 def cancel_bulk_validation():
     return requests.delete(
         ("https://api.mailgun.net/v4/address/validate/bulk/LIST_NAME"),
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def cancel_bulk_validation
   RestClient.delete("https://api:YOUR_API_KEY" \
                     "@api.mailgun.net/v4/address/validate/bulk/LIST_NAME")
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class DeleteBulkValidationChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (CancelBulkValidation ().Content.ToString ());
     }

     public static IRestResponse CancelBulkValidation()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v4");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "address/validate/bulk/{list}";
         request.AddParameter ("list", "LIST_NAME",
                               ParameterType.UrlSegment);
         request.Method = Method.DELETE;
         return client.Execute (request);
     }

 }
