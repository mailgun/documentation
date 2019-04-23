.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' -X DELETE -G \
    https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME/versions/VERSION_TAG

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode deleteTemplateVersion() throws UnirestException {
 
         HttpResponse <JsonNode> request = Unirest.delete (
                                "https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/templates/TEMPLATE_NAME/versions/VERSION_TAG")
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
  $name = 'TEMPLATE_NAME'
  $tag = 'VERSION_TAG'
  
  # Issue the call to the client.
  $result = $mgClient->delete("$domain/templates/$name/versions/$tag");

.. code-block:: py

 def delete_template_version():
     return requests.delete(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME/versions/VERSION_TAG",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def delete_template_version
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME/versions/VERSION_TAG"
   
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

         request.Resource = "/{domain}/templates/{name}/versions/{tag}";
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.AddParameter ("name", "TEMPLATE_NAME", ParameterType.UrlSegment);
         request.AddParameter ("tag", "VERSION_TAG", ParameterType.UrlSegment);

         request.Method = Method.DELETE
         return client.Execute (request);
     }

 }

.. code-block:: go

    import (
        "context"
        "github.com/mailgun/mailgun-go/v3"
        "time"
    )

    func DeleteTemplateVersion(domain, apiKey string) error {
        mg := mailgun.NewMailgun(domain, apiKey)

        ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
        defer cancel()

        // Delete the template version tagged as 'VERSION_TAG'
        return mg.DeleteTemplateVersion(ctx, "TEMPLATE_NAME", "VERSION_TAG")
    }

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.delete('/${DOMAIN}/templates/TEMPLATE_NAME/versions/VERSION_TAG', function (error, body) {
   console.log(body);
 });

