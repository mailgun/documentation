
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
	https://api.mailgun.net/v3/routes \
	-d skip=1 \
	-d limit=1

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

     public static ClientResponse ParseAddresses() {

         Client client = ClientBuilder.newClient();
         client.register(HttpAuthenticationFeature.basic(
             "api",
             "YOUR_API_KEY"
         ));

         WebTarget mgRoot = client.target("https://api.mailgun.net/v3");

         return mgRoot
             .path("/routes")
             .queryParam("skip", 1)
             .queryParam("limit", 1)
             .request()
             .buildGet()
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
  $result = $mgClient->get("routes", array('skip' => 5, 'limit' => 10));

.. code-block:: py

 def get_routes():
     return requests.get(
         "https://api.mailgun.net/v3/routes",
         auth=("api", "YOUR_API_KEY"),
         params={"skip": 1,
                 "limit": 1})

.. code-block:: rb

 def get_routes
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/routes", :params => {
     :skip => 1,
     :limit => 1
   }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;
 
 public class GetRoutesChunk
 {
 
     public static void Main (string[] args)
     {
         Console.WriteLine (GetRoutes ().Content.ToString ());
     }
 
     public static IRestResponse GetRoutes ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "routes";
         request.AddParameter ("skip", 1);
         request.AddParameter ("limit", 1);
         return client.Execute (request);
     }
 
 }

.. code-block:: go

 func GetRoutes(domain, apiKey string) (int, []mailgun.Route, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.GetRoutes(-1, -1)
 }
