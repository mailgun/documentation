
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
	https://api.mailgun.net/v3/lists/pages

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode mailingLists() throws UnirestException{

         HttpResponse <JsonNode> request = Unirest.get("https://api.mailgun.net/v3/lists/pages")
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

  # Issue the call to the client.
  $result = $mgClient->get("lists/pages", array(
      'limit'      =>  5
  ));

.. code-block:: py

 def list_members():
     return requests.get(
         "https://api.mailgun.net/v3/lists/pages",
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def list_members
   RestClient.get("https://api:YOUR_API_KEY" \
                  "@api.mailgun.net/v3/lists/pages")
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetMailingListsChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetMailingLists ().Content.ToString ());
     }

     public static IRestResponse GetMailingLists ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "lists/pages";
         return client.Execute (request);
     }

 }

.. code-block:: go

 // Coming soon
