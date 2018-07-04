
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -X PUT \
        https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/templates/YOUR_TEMPLATE_ID \
        -F template='YOUR_NEW_TEMPLATE' \
        -F description = 'NEW_TEMPLATE_DESCRIPTION'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode updateTemplate() throws UnirestException {

         HttpResponse <JsonNode> request = Unirest.put("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/templates" + YOUR_TEMPLATE_ID)
             .basicAuth("api", API_KEY)
             .field("template", "YOUR_NEW_TEMPLATE")
             .field("description", "NEW_TEMPLATE_DESCRIPTION")
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
  $templateId = 'YOUR_TEMPLATE_ID'

  # Issue the call to the client.
  $result = $mgClient->put("$domain/templates/$templateId", array(
      'template' => 'YOUR_NEW_TEMPLATE',
      'description' => 'NEW_TEMLATE_DESCRIPTION'
  ));

.. code-block:: py

 def update_template():
     return requests.put(
         ("https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/YOUR_TEMPLATE_ID"),
         auth=('api', 'YOUR_API_KEY'),
         data={'template': 'YOUR_NEW_TEMPLATE_ID', 'description': 'NEW_TEMPLATE_DESCRIPTION'})

.. code-block:: rb

 def update_template
   RestClient.put("https://api:YOUR_API_KEY" \
                  "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/YOUR_TEMPLATE_ID",
                  :template => 'YOUR_NEW_TEMPLATE',
                  :description => 'NEW_TEMPLATE_DESCRIPTION')
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class UpdateTemplateChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (UpdateTemplate ().Content.ToString ());
     }

     public static IRestResponse UpdateTemplate ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "/YOUR_DOMAIN_NAME/template/YOUR_TEMPLATE_ID";
         request.AddParameter ("template", "YOUR_NEW_TEMPLATE");
         request.AddParameter ("description", "NEW_TEMPLATE_DESCRIPTION");
         request.Method = Method.PUT;
         return client.Execute (request);
     }

 }

.. code-block:: go

 // Not implemented

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.put(`/${DOMAIN}/templates/${TEMPLATE_ID}`, {"template": 'YOUR_NEW_TEMPLATE', "description": "NEW_TEMPLATE_DESCRIPTION"}, function (error, body) {
   console.log(body);
 });
