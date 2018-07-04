.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -G \
    https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates \
    -d limit=10

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode getTemplates() throws UnirestException {
 
         HttpResponse <JsonNode> request = Unirest.get("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/templates")
             .basicAuth("api", API_KEY)
             .queryString("limit","5")
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
  $result = $mgClient->get("$domain/templates", array('limit' => 10));

.. code-block:: py

 def get_templates():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates",
         auth=("api", "YOUR_API_KEY"),
         params={"limit": 1})

.. code-block:: rb

 def get_templates
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates", :params => {
     :limit => 5
   }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetTemplatesChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetTemplates ().Content.ToString ());
     }

     public static IRestResponse GetTemplates ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.AddParameter ("limit", 5);
         request.Resource = "/{domain}/templates";
         return client.Execute (request);
     }

 }

.. code-block:: go

 // Not supported yet.

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.get('/${DOMAIN}/templates', {"limit": 5}, function (error, body) {
   console.log(body);
 });

