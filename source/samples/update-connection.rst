
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -X PUT \
	https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/connection
	-F require_tls='true' \
	-F skip_verification='false'

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

     public static ClientResponse UpdateConnectionSettings() {

         Client client = ClientBuilder.newClient();
         client.register(HttpAuthenticationFeature.basic(
             "api",
             "YOUR_API_KEY"
         ));

         WebTarget mgRoot = client.target("https://api.mailgun.net/v3");

         Form reqData = new Form();
         reqData.param("require_tls", "true");
         reqData.param("skip_verification", "false");

         return mgRoot
             .path("/domains/{domain}/connection")
             .resolveTemplate("domain", "YOUR_DOMAIN_NAME")
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

  # Issue the call to the client.
  $result = $mgClient->put("domains/$domain/connection", array(
      'require_tls'       => 'true',
      'skip_verification' => 'false'
  ));

.. code-block:: py

 def update_connection():
     return requests.put(
         ("https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/connection"),
         auth=('api', 'YOUR_API_KEY'),
         data={'require_tls': True,
               'skip_verification': False})

.. code-block:: rb

 def update_member
   RestClient.put("https://api:YOUR_API_KEY" \
                  "@api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/connection",
                  :require_tls => true,
                  :skip_verification => false)
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;
 
 public class UpdateConnectionChunk
 {
 
     public static void Main (string[] args)
     {
         Console.WriteLine (UpdateConnection ().Content.ToString ());
     }
 
     public static IRestResponse UpdateConnection ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "domains/YOUR_DOMAIN_NAME/connection";
         request.AddParameter ("require_tls", true);
         request.AddParameter ("skip_verification", false);
         request.Method = Method.PUT;
         return client.Execute (request);
     }
 
 }

.. code-block:: go

 // Coming soon
