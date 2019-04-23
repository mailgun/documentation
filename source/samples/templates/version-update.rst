.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -X PUT \
    https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME/versions/VERSION_TAG \
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
 
         HttpResponse <JsonNode> request = Unirest.put("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/templates/TEMPLATE_NAME/versions/VERSION_TAG")
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
  $name = 'TEMPLATE_NAME'
  $tag = 'VERSION_TAG'

  # Issue the call to the client.
  $result = $mgClient->put("$domain/templates/$name/versions/$tag", array(
      'template' => '{{fname}} {{lname}}',
      'comment' => 'Updated version comment',
      'active' => 'yes'
  ));

.. code-block:: py

 def update_version():
     return requests.put(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME/versions/VERSION_TAG",
         auth=("api", "YOUR_API_KEY"),
         data={'template': '{{fname}} {{lname}}',
               'comment': 'Updated version comment',
               'active': 'yes'})

.. code-block:: rb

 def update_version: 
   RestClient.put "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME/versions/VERSION_TAG",
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
         request.Resource = "{domain}/templates/{name}/versions/{tag}";
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.AddParameter ("name", "TEMPLATE_NAME", ParameterType.UrlSegment);
         request.AddParameter ("tag", "VERSION_TAG", ParameterType.UrlSegment);
         request.AddParameter ("template", "{{fname}} {{lname}}");
         request.AddParameter ("comment", "Updated version comment");
         request.AddParameter ("active", "yes");
         request.Method = Method.PUT;
         return client.Execute (request);
     }

 }

.. code-block:: go

    import (
        "context"
        "github.com/mailgun/mailgun-go/v3"
        "time"
    )

    func UpdateTemplateVersion(domain, apiKey string) error {
        mg := mailgun.NewMailgun(domain, apiKey)

        ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
        defer cancel()

        return mg.UpdateTemplateVersion(ctx, "TEMPLATE_NAME", &mailgun.TemplateVersion{
            Comment: "Add a comment to the template and make it 'active'",
            Tag:     "VERSION_TAG",
            Active:  true,
        })
    }

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.put(`/${DOMAIN}/templates/TEMPLATE_NAME/versions/VERSION_TAG`,
             {"template" : "{{fname}} {{lname}}",
              "comment": "Updated version comment",
              "active": "yes"},
              function (error, body) {
                  console.log(body);
              });

