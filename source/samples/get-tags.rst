.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' -G \
    https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/tags \
    -d limit=10

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

     public static ClientResponse GetTags() {

         Client client = ClientBuilder.newClient();
         client.register(HttpAuthenticationFeature.basic(
             "api",
             "YOUR_API_KEY"
         ));

         WebTarget mgRoot = client.target("https://api.mailgun.net/v3");

         return mgRoot
             .path("/{domain}/tags")
             .resolveTemplate("domain", "YOUR_DOMAIN_NAME")
             .queryParam("limit", 10)
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
  $domain = 'YOUR_DOMAIN_NAME';

  # Issue the call to the client.
  $result = $mgClient->get("$domain/tags", array(
      'limit' => 10
  ));

.. code-block:: py

 def get_stats():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/tags",
         auth=("api", "YOUR_API_KEY"),
         params={"limit": 10})

.. code-block:: rb

 def get_stats
   url_params = {}
   url_params[:limit] = 10
   query_string = url_params.collect {|k, v| "#{k.to_s}=#{CGI::escape(v.to_s)}"}.
     join("&")
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/tags?#{query_string}"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;
 
 public class GetTagsChunk
 {
 
     public static void Main (string[] args)
     {
         Console.WriteLine (GetTags ().Content.ToString ());
     }
 
     public static IRestResponse GetTags ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "{domain}/tags";
         request.AddParameter ("limit", 10);
         return client.Execute (request);
     }
 
 }

.. code-block:: go

 // Not supported yet.
