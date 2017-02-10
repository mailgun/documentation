.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v3/routes \
	-F priority=0 \
	-F description='Sample route' \
	-F expression='match_recipient(".*@YOUR_DOMAIN_NAME")' \
	-F action='forward("http://myhost.com/messages/")' \
	-F action='stop()'

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

     public static ClientResponse CreateRoute() {

         Client client = ClientBuilder.newClient();
         client.register(HttpAuthenticationFeature.basic(
             "api",
             "YOUR_API_KEY"
         ));

         WebTarget mgRoot = client.target("https://api.mailgun.net/v3");

         Form reqData = new Form();
         reqData.param("priority", 0);
         reqData.param("description", "Sample route");
         reqData.param("expression", "match_recipient('.*@YOUR_DOMAIN_NAME')");
         reqData.param("action", "forward('http://myhost.com/messages/')");
         reqData.param("action", "stop()");

         return mgRoot
             .path("/routes")
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
  $result = $mgClient->post("routes", array(
      'priority'    => 0,
      'expression'  => 'match_recipient(".*@YOUR_DOMAIN_NAME")',
      'action'      => array('forward("http://host.com/messages")', 'stop()'),
      'description' => 'Sample route'
  ));

.. code-block:: py

 def create_route():
     return requests.post(
         "https://api.mailgun.net/v3/routes",
         auth=("api", "YOUR_API_KEY"),
         data={"priority": 0,
               "description": "Sample route",
               "expression": "match_recipient('.*@YOUR_DOMAIN_NAME')",
               "action": ["forward('http://myhost.com/messages/')", "stop()"]})

.. code-block:: rb

 def create_route
   data = Multimap.new
   data[:priority] = 0
   data[:description] = "Sample route"
   data[:expression] = "match_recipient('.*@YOUR_DOMAIN_NAME')"
   data[:action] = "forward('http://myhost.com/messages/')"
   data[:action] = "stop()"
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/routes", data
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;
 
 public class CreateRouteChunk
 {
 
     public static void Main (string[] args)
     {
         Console.WriteLine (CreateRoute ().Content.ToString ());
     }
 
     public static IRestResponse CreateRoute ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "routes";
         request.AddParameter ("priority", 0);
         request.AddParameter ("description", "Sample route");
         request.AddParameter ("expression", "match_recipient('.*@YOUR_DOMAIN_NAME')");
         request.AddParameter ("action",
                               "forward('http://myhost.com/messages/')");
         request.AddParameter ("action", "stop()");
         request.Method = Method.POST;
         return client.Execute (request);
     }
 
 }

.. code-block:: go

 func CreateRoute(domain, apiKey string) (mailgun.Route, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.CreateRoute(mailgun.Route{
     Priority:    1,
     Description: "Sample Route",
     Expression:  "match_recipient(\".*@YOUR_DOMAIN_NAME\")",
     Actions: []string{
       "forward(\"http://example.com/messages/\")",
       "stop()",
     },
   })
 }
