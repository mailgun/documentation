
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/complaints \
	-F address='bob@example.com'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
      // ...
 
     public static JsonNode addComplaint() throws UnirestException {
 
         HttpResponse <JsonNode> request = Unirest.post("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/complaints")
 			.basicAuth("api", API_KEY)
 			.field("address", "bob@example.com")
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
  $result = $mgClient->post("$domain/complaints", array('address' => 'bob@example.com'));

.. code-block:: py

 def add_complaint():
     return requests.post(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/complaints",
         auth=("api", "YOUR_API_KEY"),
         data={'address': 'bob@example.com'})

.. code-block:: rb

 def add_complaint
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/complaints",
   :address => 'bob@example.com'
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class AddComplaintChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (AddComplaint ().Content.ToString ());
     }

     public static IRestResponse AddComplaint ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "{domain}/complaints";
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.AddParameter ("address", "bob@example.com");
         request.Method = Method.POST;
         return client.Execute (request);
     }

 }

.. code-block:: go

 func CreateComplaint(domain, apiKey, emailAddress string) error {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.CreateComplaint("bob@example.com")
 }

 .. code-block:: node

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.post(`/${DOMAIN}/complaints`, {"address" : "bob@example.com"}, function (error, body) {
   console.log(body);
 });
