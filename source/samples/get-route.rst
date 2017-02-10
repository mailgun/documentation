
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v3/routes/4f3bad2335335426750048c6

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

     public static ClientResponse GetRoute() {

         Client client = ClientBuilder.newClient();
         client.register(HttpAuthenticationFeature.basic(
             "api",
             "YOUR_API_KEY"
         ));

         WebTarget mgRoot = client.target("https://api.mailgun.net/v3");

         return mgRoot
             .path("/routes/{route_id}")
             .resolveTemplate("route_id", "YOUR_ROUTE_ID")
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
  $routeId = '4e97c1b2ba8a48567f007fb6';

  # Issue the call to the client.
  $result = $mgClient->get("routes/$routeId");

.. code-block:: py

 def get_route():
     return requests.get(
         "https://api.mailgun.net/v3/routes/4e97c1b2ba8a48567f007fb6",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_route
   RestClient.
     get("https://api:YOUR_API_KEY"\
         "@api.mailgun.net/v3/routes/"\
         "4e97c1b2ba8a48567f007fb6"){|response, request, result| response }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;
 
 public class GetRouteChunk
 {
 
     public static void Main (string[] args)
     {
         Console.WriteLine (GetRoute ().Content.ToString ());
     }
 
     public static IRestResponse GetRoute ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "routes/{id}";
         request.AddUrlSegment ("id", "4e97c1b2ba8a48567f007fb6");
         return client.Execute (request);
     }
 
 }

.. code-block:: go

 func GetRouteByID(domain, apiKey string) (Route, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.GetRouteByID("4e97c1b2ba8a48567f007fb6")
 }
