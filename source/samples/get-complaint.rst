
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
	https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/complaints/baz@example.com

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode getComplaint() throws UnirestException{

		     HttpResponse <JsonNode> request = Unirest.get("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/complaints/baz@example.com")
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
  $complaint = 'user@example.com';

  # Issue the call to the client.
  $result = $mgClient->get("$domain/complaints/$complaint");

.. code-block:: py

 def get_complaint():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/complaints/baz@example.com",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_complaint
   RestClient.get("https://api:YOUR_API_KEY"\
                  "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/complaints/"\
                  "baz@example.com"){|response, request, result| response }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetComplaintChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetComplaint ().Content.ToString ());
     }

     public static IRestResponse GetComplaint ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "{domain}/complaints/baz@example.com";
         return client.Execute (request);
     }

 }

.. code-block:: go

 func GetComplaints(domain, apiKey string) (mailgun.Complaint, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.GetSingleComplaint("baz@example.com")
 }

.. code-block:: node

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.get(`/${DOMAIN}/complaints/baz@example.com`, function (error, body) {
   console.log(body);
 });
 
