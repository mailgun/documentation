.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v3/routes \
	-F priority=0 \
	-F description='Sample route' \
	-F expression='match_recipient(".*@YOUR_DOMAIN_NAME")' \
	-F action='forward("http://myhost.com/messages/")' \
	-F action='stop()'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode createRoute() throws UnirestException {
 
         HttpResponse <JsonNode> request = Unirest.post("https://api.mailgun.net/v3/routes")
             .basicAuth("api", API_KEY)
             .field("priority", "0")
             .field("description", "sample route")
             .field("expression", "match_recipient('.*@YOUR_DOMAIN_NAME')")
             .field("action", "forward('http://myhost.com/messages/')")
             .field("action", "stop()")
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
   data = {}
   data[:priority] = 0
   data[:description] = "Sample route"
   data[:expression] = "match_recipient('.*@YOUR_DOMAIN_NAME')"
   data[:action] = []
   data[:action] << "forward('http://myhost.com/messages/')"
   data[:action] << "stop()"
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
   mg := mailgun.NewMailgun(domain, apiKey)
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

 .. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.post('/routes', {"priority": 0, "description": 'Sample route', "expression": 'match_recipient(".*@YOUR_DOMAIN_NAME")', "action": 'forward("http://myhost.com/messages/")', "action": 'stop()'}, function (error, body) {
   console.log(body);
 });
