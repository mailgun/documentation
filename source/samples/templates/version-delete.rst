.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' -X DELETE -G \
    https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_ID?version=VERSION_ID

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode deleteTemplateVersion() throws UnirestException {
 
         HttpResponse <JsonNode> request = Unirest.delete(
                                "https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/templates/TEMPLATE_ID")
             .basicAuth("api", API_KEY)
             .queryString("version", "VERSION_ID")
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
  $result = $mgClient->delete("$domain/templates/$templateId", array('version' => 'VERSION_ID'));

.. code-block:: py

 def delete_template_version():
     return requests.delete(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_ID",
         auth=("api", "YOUR_API_KEY"),
         params={"version": "VERSION_ID"})

.. code-block:: rb

 def delete_template_version
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_ID", :params => {
     :version => 'VERSION_ID'
   }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class DeleteTemplateVersionChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (DeleteTemplateVersion ().Content.ToString ());
     }

     public static IRestResponse DeleteTemplateVersion ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.AddParameter ("templateId", "TEMPLATE_ID", ParameterType.UrlSegment);
         request.AddParameter ("version", "VERSION_ID");
         request.Resource = "/{domain}/templates/{templateId}";
         request.Method = Method.DELETE
         return client.Execute (request);
     }

 }

.. code-block:: go

 // Not supported yet.

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.delete('/${DOMAIN}/templates/TEMPLATE_ID', {"version": "VERSION_ID"}, function (error, body) {
   console.log(body);
 });

