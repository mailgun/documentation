.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	-X POST \
	https://api.mailgun.net/v3/domains \
	-F name='YOUR_NEW_DOMAIN_NAME' \
	-F smtp_password='supersecretpassword'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode addDomain() throws UnirestException {
 
         HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.mailgun.net/v3/domains")
             .basicAuth("api", API_KEY)
             .field("name", "YOUR_NEW_DOMAIN_NAME")
             .field("smtp_password", "supersecretpassword")
             .asJson();
 
         return jsonResponse.getBody();
     }
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');
  $domain = 'YOUR_NEW_DOMAIN_NAME';

  # Issue the call to the client.
  $result = $mgClient->post("domains", array(
      'name'          => 'anothersample.mailgun.org',
      'smtp_password' => 'supersecretpassword'
  ));

.. code-block:: py

 def add_domain():
     return requests.post(
         "https://api.mailgun.net/v3/domains",
         auth=("api", "YOUR_API_KEY"),
         data={'name':'YOUR_NEW_DOMAIN_NAME', 'smtp_password':'supersecretpassword'})

.. code-block:: rb

 def add_domain
   RestClient.post("https://api:YOUR_API_KEY"\
                   "@api.mailgun.net/v3/domains",
                   :name => 'YOUR_NEW_DOMAIN_NAME',
                   :smtp_password => 'supersecretpassword')
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class AddDomainChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (AddDomain ().Content.ToString ());
     }

     public static IRestResponse AddDomain ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3/");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "domains";
         request.AddParameter ("name", "YOUR_NEW_DOMAIN_NAME");
         request.AddParameter ("smtp_password", "supersecretpassword");
         request.Method = Method.POST;
         return client.Execute (request);
     }

 }

.. code-block:: go

 func AddDomain(domain, apiKey string) error {
        mg := mailgun.NewMailgun(domain, apiKey, "")
        return mg.CreateDomain("YOUR_NEW_DOMAIN_NAME", "supersecretpassword", mailgun.Tag, false)
 }

.. code-block:: node

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.post('/domains', {"name" : "YOUR_NEW_DOMAIN_NAME", "smtp_password" : "supersecret"}, function (error, body) {
   console.log(body);
 });
