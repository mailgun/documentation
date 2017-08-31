
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -X PUT \
	https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/mailboxes/alice \
	-F password='abc123'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode changeMailboxPassword() throws UnirestException {
 
         HttpResponse<JsonNode> request = Unirest.put("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/mailboxes/alice")
             .basicAuth("api", API_KEY)
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
  $mailbox = 'alice';

  # Issue the call to the client.
  $result = $mgClient->put("$domain/mailboxes/$mailbox", array(
      'password' => 'supersecret'
  ));

.. code-block:: py

 def change_mailbox_password():
     return requests.put(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/mailboxes/alice",
         auth=("api", "YOUR_API_KEY"),
         data={"password": "supersecret"})

.. code-block:: rb

 def change_mailbox_password
   RestClient.put "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/mailboxes/alice",
   :password => "supersecret"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class ChangeMailboxPasswordChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (ChangeMailboxPassword ().Content.ToString ());
     }

     public static IRestResponse ChangeMailboxPassword ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "{domain}/mailboxes/{login}";
         request.AddUrlSegment ("login", "alice");
         request.AddParameter ("password", "supersecret");
         request.Method = Method.PUT;
         return client.Execute (request);
     }

 }

.. code-block:: go

 // coming soon


.. code-block:: node

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.put(`/${DOMAIN}/mailboxes/alice`, {"password": "supersecret"}, function (error, body) {
   console.log(body);
 });
