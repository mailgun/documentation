
.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' -X DELETE \
     https://api.mailgun.net/v3/domains/example.mailgun.org

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode deleteDomain() throws UnirestException{

	       HttpResponse<JsonNode> request = Unirest.delete("https://api.mailgun.net/v3/domains/domain.example.com")
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
  $domain = 'example.mailgun.org';

  # Issue the call to the client.
  $result = $mgClient->delete("domains/$domain");

.. code-block:: py

 def delete_domain():
     return requests.delete(
         "https://api.mailgun.net/v3/domains/example.mailgun.org",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def delete_domain
   RestClient.delete "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/domains/example.mailgun.org"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class DeleteDomainChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (DeleteDomain ().Content.ToString ());
     }

     public static IRestResponse DeleteDomain ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "/domains/{name}";
         request.AddUrlSegment ("name", "example.mailgun.org");
         request.Method = Method.DELETE;
         return client.Execute (request);
     }

 }

.. code-block:: go

 func DeleteDomain(domain, apiKey string) error {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.DeleteDomain("subdomain.example.com")
 }
