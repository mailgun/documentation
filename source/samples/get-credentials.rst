
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
	https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/credentials

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode getCredentials() throws UnirestException{
	       HttpResponse<JsonNode> request = Unirest.get("https://api.mailgun.net/v3/domains/" + YOUR_DOMAIN_NAME + "/credentials")
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
  $domain = 'YOUR_DOMAIN_NAME';

  # Issue the call to the client.
  $result = $mgClient->get("domains/$domain/credentials", array(
      'limit' => 5,
      'skip'  => 10
  ));

.. code-block:: py

 def get_credentials():
     return requests.get(
         "https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/credentials",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_credentials
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/credentials"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetCredentialsChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetCredentials ().Content.ToString ());
     }

     public static IRestResponse GetCredentials ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "domains/{domain}/credentials";
         return client.Execute (request);
     }

 }

.. code-block:: go

 func GetCredentials(domain, apiKey string) (int, []mailgun.Credential, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.GetCredentials(-1, -1)
 }
