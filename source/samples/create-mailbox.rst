
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/mailboxes \
	-F mailbox='alice@YOUR_DOMAIN_NAME' \
	-F password='supasecret'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode createMailbox() throws UnirestException{

      HttpResponse<JsonNode> request = Unirest.post("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/mailboxes")
          .basicAuth("api", API_KEY)
          .field("mailbox", "alice@example.com")
          .field("password", "supersecret")
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
  $result = $mgClient->post("$domain/mailboxes", array(
      'mailbox'  => 'alice@YOUR_DOMAIN_NAME',
      'password' => 'secret'
  ));

.. code-block:: py

 def create_mailbox():
     return requests.post(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/mailboxes",
         auth=("api", "YOUR_API_KEY"),
         data={"mailbox": "alice@YOUR_DOMAIN_NAME",
               "password": "secret"})

.. code-block:: rb

 def create_mailbox
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/mailboxes",
   :mailbox => "alice@YOUR_DOMAIN_NAME",
   :password => "secret"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class CreateMailboxChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (CreateMailbox ().Content.ToString ());
     }

     public static IRestResponse CreateMailbox ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "{domain}/mailboxes";
         request.AddParameter ("mailbox", "alice@YOUR_DOMAIN_NAME");
         request.AddParameter ("password", "secret");
         request.Method = Method.POST;
         return client.Execute (request);
     }

 }

.. code-block:: go

 // Not supported

 .. code-block:: node

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.post(`/${DOMAIN}/mailboxes`, {"mailbox": "alice@${DOMAIN}", "password": "supersecret"}, function (error, body) {
   console.log(body);
 });
