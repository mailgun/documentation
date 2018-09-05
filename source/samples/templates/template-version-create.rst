.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -X POST \
    https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates \
    -F name='TEMPLATE_NAME' \
    -F description='TEMPLATE_DESCRIPTION' \
    -F template='TEMPLATE' \
    -F engine='mustache'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
      // ...
 
     public static JsonNode storeVersion() throws UnirestException {
 
         HttpResponse <JsonNode> request = Unirest.post("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/templates")
 			.basicAuth("api", API_KEY)
 			.field("name", "TEMPLATE_NAME")
            .field("description", "TEMPLATE_DESCRIPTION")
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

  # Issue the call to the client.
  $result = $mgClient->post("$domain/templates", array(
      'name' => 'TEMPLATE_NAME',
      'description' => 'TEMPLATE_DESCRIPTION',
      'template' => 'TEMPLATE',
      'engine' => 'mustache'
  ));

.. code-block:: py

 def store_template():
     return requests.post(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates",
         auth=("api", "YOUR_API_KEY"),
         data={'name': 'TEMPLATE_NAME',
               'description': 'TEMPLATE_DESCRIPTION',
               'template': 'TEMPLATE',
               'engine': 'mustache'})

.. code-block:: rb

 def store_template
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates",
   :name => 'TEMPLATE_NAME',
   :description => 'TEMPLATE_DESCRIPTION',
   :template => 'TEMPLATE',
   :engine => 'mustache'
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class StoreTemplatesChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (StoreTemplate ().Content.ToString ());
     }

     public static IRestResponse StoreTemplate ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "{domain}/templates";
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.AddParameter ("name", "TEMPLATE_NAME");
         request.AddParameter ("description", "TEMPLATE_DESCRIPTION")
         request.AddParameter ("template", "TEMPLATE")
         request.AddParameter ("engine", "mustache")
         request.Method = Method.POST;
         return client.Execute (request);
     }

 }

.. code-block:: go

 // Not implemented yet

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.post(`/${DOMAIN}/templates`, {"name" : "TEMPLATE_NAME",
                                       "description": "TEMPLATE_DESCRIPTION",
                                       "template": "TEMPLATE",
                                       "engine": "mustache"}, function (error, body) {
                                                                   console.log(body);
                                                               });

