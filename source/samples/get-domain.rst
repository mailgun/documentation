
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
 
     public static JsonNode getDomain() throws UnirestException {
 
         HttpResponse<JsonNode> request = Unirest.get("https://api.mailgun.net/v3/domains/" + YOUR_DOMAIN_NAME)
             .basicAuth("api", API_KEY)
             .queryString("skip", 0)
      	    .queryString("limit", 3)
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
  $result = $mgClient->get("domains/$domain");

.. code-block:: py

 def get_domain():
     return requests.get(
         "https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_domain
   RestClient.get("https://api:YOUR_API_KEY"\
                  "@api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME"\
                  {|response, request, result| response }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetDomainChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetDomain ().Content.ToString ());
     }

     public static IRestResponse GetDomain ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "/domains/{domain}";
         return client.Execute (request);
     }

 }

.. code-block:: go

 func GetSingleDomain(domain, apiKey string) (mailgun.Domain, []mailgun.DNSRecord, []mailgun.DNSRecord, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.GetSingleDomain(domains[0].Name)
 }

.. code-block:: node

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.get(`/domain/${DOMAIN}, function (error, body) {
   console.log(body);
 });
