.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' -X DELETE \
     https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/YOUR_TEMPLATE_ID

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode deleteTemplate() throws UnirestException {

         HttpResponse<JsonNode> request = Unirest.delete("https://api.mailgun.net/v3/"+ YOUR_DOMAIN_NAME +"/templates/YOUR_TEMPLATE_ID")
             .basicAuth("api", API_KEY)
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
  $templateId = 'YOUR_TEMPLATE_ID';

  # Issue the call to the client.
  $result = $mgClient->delete("/$domain/templates/$templateId");

.. code-block:: py

 def delete_template():
     return requests.delete(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/YOUR_TEMPLATE_ID",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def delete_template
   RestClient.delete "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/YOUR_TEMPLATE_ID"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class DeleteTemplate
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (DeleteTemplate ().Content.ToString ());
     }

     public static IRestResponse DeleteTemplate ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "{domain}/templates/{templateId}";
         request.AddUrlSegment ("templateId", "YOUR_TEMPLATE_ID");
         request.Method = Method.DELETE;
         return client.Execute (request);
     }

 }

.. code-block:: go

 // Not implemented

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.delete(`/${DOMAIN}/templates/${YOUR_TEMPLATE_ID}`, function (error, body) {
   console.log(body);
 });

