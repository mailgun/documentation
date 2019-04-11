
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

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');
  $listAddress = 'LIST@YOUR_DOMAIN_NAME';

  # Issue the call to the client.
  $result = $mgClient->get("lists/$listAddress/validate");

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
