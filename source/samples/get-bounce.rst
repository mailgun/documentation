
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
	https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/bounces/foo@bar.com

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode getSingleBounce() throws UnirestException{

         HttpResponse <JsonNode> request = Unirest.get("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/bounces/foo@bar.com")
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
  $bounce = 'bob@example.com';

  # Issue the call to the client.
  $result = $mgClient->get("$domain/bounces/$bounce");

.. code-block:: py

 def get_bounce():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/bounces/foo@bar.com",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_bounce
   RestClient.get("https://api:YOUR_API_KEY"\
                  "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/bounces"\
                  "/foo@bar.com"){|response, request, result| response }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetBounceChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetBounce ().Content.ToString ());
     }

     public static IRestResponse GetBounce ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "{domain}/bounces/foo@bar.com";
         return client.Execute (request);
     }

 }

.. code-block:: go

 func GetBounce(domain, apiKey string) (mailgun.Bounce, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.GetSingleBounce("foo@bar.com")
 }

.. code-block:: node

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.get(`/${DOMAIN}/bounces`, function (error, body) {
   console.log(body);
 });
