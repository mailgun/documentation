
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
    https://api.mailgun.net/v3/domains \
    -F name='YOUR_DOMAIN_NAME' \
    -F smtp_password='supasecret'

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

     public static ClientResponse CreateDomain() {

         Client client = ClientBuilder.newClient();
         client.register(HttpAuthenticationFeature.basic(
             "api",
             "YOUR_API_KEY"
         ));

         WebTarget mgRoot = client.target("https://api.mailgun.net/v3");

         Form reqData = new Form();
         reqData.param("name", "YOUR_DOMAIN_NAME");
         reqData.param("smtp_password", "supersecret");

         return mgRoot
             .path("/domains")
             .resolveTemplate("domain", "YOUR_DOMAIN_NAME")
             .request(MediaType.APPLICATION_FORM_URLENCODED)
             .buildPost(Entity.entity(reqData, MediaType.APPLICATION_FORM_URLENCODED))
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
  $result = $mgClient->post("domains", array(
      'name'          => 'newdomain.mailgun.org',
      'smtp_password' => 'supersecret'
  ));

.. code-block:: py

 def create_domain():
     return requests.post(
         "https://api.mailgun.net/v3/domains",
         auth=("api", "YOUR_API_KEY"),
         data={"name": "YOUR_DOMAIN_NAME",
               "smtp_password": "supasecret"})

.. code-block:: rb

 def create_domain
   data = Multimap.new
   data[:name] = "YOUR_DOMAIN_NAME"
   data[:smtp_password] = "supasecret"
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/domains", data
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;
 
 public class CreateDomainChunk
 {
 
     public static void Main (string[]args)
     {
         Console.WriteLine (CreateDomain ().Content.ToString ());
     }
 
     public static IRestResponse CreateDomain ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "domains";
         request.AddParameter ("name", "YOUR_NEW_DOMAIN_NAME");
         request.AddParameter ("smtp_password", "supasecret");
         request.Method = Method.POST;
         return client.Execute (request);
     }
 
 }

.. code-block:: go

 func CreateDomain(domain, apiKey string) error {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.CreateDomain("YOUR_DOMAIN_NAME", "supersecretpw", mailgun.Tag, false)
 }
