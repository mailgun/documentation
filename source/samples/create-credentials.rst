
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/credentials \
	-F login='alice@YOUR_DOMAIN_NAME' \
	-F password='supasecret'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode createCredentials() throws UnirestException{

         HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.mailgun.net/v3/domains/" + YOUR_DOMAIN_NAME +"/credentials")
			       .basicAuth("api", API_KEY)
			       .field("login", "alice@YOUR_DOMAIN_NAME.com")
			       .field("password", "supersecretpassword")
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
  $domain = 'YOUR_DOMAIN_NAME';

  # Issue the call to the client.
  $result = $mgClient->post("domains/$domain/credentials", array(
      'login'    => 'alice@YOUR_DOMAIN_NAME',
      'password' => 'secret'
  ));

.. code-block:: py

 def create_credentials():
     return requests.post(
         "https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/credentials",
         auth=("api", "YOUR_API_KEY"),
         data={"login": "alice@YOUR_DOMAIN_NAME",
               "password": "secret"})

.. code-block:: rb

 def create_credentials
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/credentials",
   :login => "alice@YOUR_DOMAIN_NAME",
   :password => "secret"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class CreateCredentialsChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (CreateCredentials ().Content.ToString ());
     }

     public static IRestResponse CreateCredentials ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "domains/{domain}/credentials";
         request.AddParameter ("login", "alice@YOUR_DOMAIN_NAME");
         request.AddParameter ("password", "secret");
         request.Method = Method.POST;
         return client.Execute (request);
     }

 }

.. code-block:: go

 func CreateCredential(domain, apiKey string) error {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.CreateCredential("alice@YOUR_DOMAIN_NAME", "secret")
 }
