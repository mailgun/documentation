
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

     public static JsonNode createCredentials() throws UnirestException {

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
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $domain   = 'YOUR_DOMAIN_NAME';
  $smtpUser = 'bob';
  $smtpPass = 'new_password';

  # Issue the call to the client.
  $result = $mgClient->domains()->createCredential($domain, $smtpUser, $smtpPass);

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

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func CreateCredential(domain, apiKey string) error {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.CreateCredential(ctx, "alice@example.com", "secret")
 }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const createdCredentials = await client.domains.domainCredentials.create(DOMAIN, {
          login: 'alice@YOUR_DOMAIN_NAME',
          password: 'secret'
      });
      console.log('createdCredentials', createdCredentials);
    } catch (error) {
        console.error(error);
    }
  })();


