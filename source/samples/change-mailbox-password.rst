
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -X PUT \
	https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/mailboxes/alice \
	-F password='abc123'

.. code-block:: java

 import javax.ws.rs.client.Client;
 import javax.ws.rs.client.ClientBuilder;
 import javax.ws.rs.client.Entity;
 import javax.ws.rs.client.WebTarget;

 import javax.ws.rs.core.Form;
 import javax.ws.rs.core.MediaType;

 import org.glassfish.jersey.client.authentication.HttpAuthenticationFeature;

 public class MGSample {

     // ...

     public static ClientResponse ChangeMailboxPassword() {

         Client client = ClientBuilder.newClient();
         client.register(HttpAuthenticationFeature.basic(
             "api",
             "YOUR_API_KEY"
         ));

         WebTarget mgRoot = client.target("https://api.mailgun.net/v3");

         Form reqData = new Form();
         reqData.param("password", "supersecret");

         return mgRoot
             .path("/{domain}/mailboxes/{username}")
             .resolveTemplate("domain", "YOUR_DOMAIN_NAME")
             .resolveTemplate("username", "YOUR_MAILBOX_USER")
             .request(MediaType.APPLICATION_FORM_URLENCODED)
             .buildPut(Entity.entity(reqData, MediaType.APPLICATION_FORM_URLENCODED))
             .invoke(ClientResponse.class);
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
