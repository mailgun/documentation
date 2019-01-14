.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -X PUT \
    https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_ID/versions/VERSION_ID \
    -F template='{{fname}} {{lname}}' \
    -F comment='Updated version comment' \
    -F active='yes'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
      // ...
 
     public static JsonNode UpdateVersion() throws UnirestException {
 
         HttpResponse <JsonNode> request = Unirest.put("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/templates/TEMPLATE_ID/versions/VERSION_ID")
 			.basicAuth("api", API_KEY)
 			.field("template", "{{fname}} {{lname}}")
            .field("comment", "Updated version comment")
            .field("active", "yes")
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
  $versionId = 'VERSION_ID'

  # Issue the call to the client.
  $result = $mgClient->put("$domain/templates/$templateId/versions/$versionId", array(
      'template' => '{{fname}} {{lname}}',
      'comment' => 'Updated version comment',
      'active' => 'yes'
  ));

.. code-block:: py

 def update_version():
     return requests.put(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_ID/versions/VERSION_ID",
         auth=("api", "YOUR_API_KEY"),
         data={'template': '{{fname}} {{lname}}',
               'comment': 'Updated version comment',
               'active': 'yes'})

.. code-block:: rb

 def update_version: 
   RestClient.put "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_ID/versions/VERSION_ID",
   :template => '{{fname}} {{lname}}',
   :comment => 'Updated version comment',
   :active => 'yes'
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class UpdateVersionChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (UpdateVersion ().Content.ToString ());
     }

     public static IRestResponse UpdateVersion ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "{domain}/templates/{templateId}/versions/{versionId}";
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.AddParameter ("templateId", "TEMPLATE_ID", ParameterType.UrlSegment);
         request.AddParameter ("versionId", "VERSION_ID", ParameterType.UrlSegment);
         request.AddParameter ("template", "{{fname}} {{lname}}");
         request.AddParameter ("comment", "Updated version comment");
         request.AddParameter ("active", "yes");
         request.Method = Method.PUT;
         return client.Execute (request);
     }

 }

.. code-block:: go

 // Not implemented yet

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.put(`/${DOMAIN}/templates/TEMPLATE_ID/versions/VERSION_ID`,
             {"template" : "{{fname}} {{lname}}",
              "comment": "Updated version comment",
              "active": "yes"},
              function (error, body) {
                  console.log(body);
              });

