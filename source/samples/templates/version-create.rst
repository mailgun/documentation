.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -X POST \
    https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_ID \
    -F template='TEMPLATE' \
    -F engine='mustache'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
      // ...
 
     public static JsonNode storeTemplateVersion() throws UnirestException {
 
         HttpResponse <JsonNode> request = Unirest.post("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/templates/TEMPLATE_ID")
 			.basicAuth("api", API_KEY)
 			.field("template", "TEMPLATE")
            .field("engine", "mustache")
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
  $templateId = 'TEMPLATE_ID'

  # Issue the call to the client.
  $result = $mgClient->post("$domain/templates/$templateId", array(
      'template' => 'TEMPLATE',
      'engine' => 'mustache'
  ));

.. code-block:: py

 def store_template_version():
     return requests.post(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates",
         auth=("api", "YOUR_API_KEY"),
         data={'template': 'TEMPLATE',
               'engine': 'mustache'})

.. code-block:: rb

 def store_template_version
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_ID",
   :template => 'TEMPLATE',
   :engine => 'mustache'
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class StoreTemplateVersionChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (StoreTemplateVersion ().Content.ToString ());
     }

     public static IRestResponse StoreTemplateVersion ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "{domain}/templates/{templateId}";
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.AddParameter ("templateId", "TEMPLATE_ID", ParameterType.UrlSegment);
         request.AddParameter ("template", "TEMPLATE");
         request.AddParameter ("engine", "mustache");
         request.Method = Method.POST;
         return client.Execute (request);
     }

 }

.. code-block:: go

 // Not implemented yet

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.post(`/${DOMAIN}/templates/TEMPLATE_ID`, {"template" : "TEMPLATE",
                                                   "engine": "mustache"}, function (error, body) {
                                                                                console.log(body);
                                                                          });

