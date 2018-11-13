
.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' -X DELETE \
     https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/credentials/alice

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode deleteCredentials() throws UnirestException {
 
         HttpResponse<JsonNode> request = Unirest.delete("https://api.mailgun.net/v3/domains/"+ YOUR_DOMAIN_NAME +"/credentials/user")
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
  $login = 'alice';

  # Issue the call to the client.
  $result = $mgClient->delete("domains/$domain/credentials/$login");

.. code-block:: py

 def delete_credentials():
     return requests.delete(
         "https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/credentials/alice",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def delete_credentials
   RestClient.delete "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/credentials/alice"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class DeleteCredentialsChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (DeleteCredentials ().Content.ToString ());
     }

     public static IRestResponse DeleteCredentials ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "domains/{domain}/credentials/{login}";
         request.AddUrlSegment ("login", "alice");
         request.Method = Method.DELETE;
         return client.Execute (request);
     }

 }

.. code-block:: go

 func DeleteCredential(domain, apiKey string) error {
   mg := mailgun.NewMailgun(domain, apiKey)
   return mg.DeleteCredential("alice")
 }

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.put(`/domains/${DOMAIN}/credentials/alice`, function (error, body) {
   console.log(body);
 });
