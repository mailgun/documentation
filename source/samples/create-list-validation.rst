.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' \
      https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members \
      -F subscribed=True \
      -F address='bar@example.com' \
      -F name='Bob Bar' \
      -F description='Developer' \
      -F vars='{"age": 26}'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode validateMailingList() throws UnirestException {

         HttpResponse <JsonNode> request = Unirest.post("https://api.mailgun.net/v3/lists/{list}@{domain}/validate")
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
  $result = $mgClient->post("lists/$listAddress/validate");

.. code-block:: py

 def validate_mailing_list():
     return requests.post(
         "https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/validate",
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def validate_mailing_list
   RestClient.post("https://api:YOUR_API_KEY" \
                   "@api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/validate")
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class ValidateMailingListChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (ValidateMailingList ().Content.ToString ());
     }

     public static IRestResponse ValidateMailingList ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "lists/{list}/validate";
         request.AddParameter ("list", "LIST@YOUR_DOMAIN_NAME",
                               ParameterType.UrlSegment);
         request.Method = Method.POST;
         return client.Execute (request);
     }

 }
