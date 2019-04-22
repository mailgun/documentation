
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' \
    https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode getTemplate() throws UnirestException {
 
         HttpResponse <JsonNode> request = Unirest.get("https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME")
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
  $name = 'TEMPLATE_NAME';

  # Issue the call to the client.
  $result = $mgClient->get("$domain/templates/$name");

.. code-block:: py

 def get_template():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_template
   RestClient.
     get("https://api:YOUR_API_KEY"\
         "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME"){|response, request, result| response }
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
         Console.WriteLine (GetTemplate ().Content.ToString ());
     }

     public static IRestResponse GetTemplate ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "/{domain}/templates/{name}";
         request.AddUrlSegment ("domain", "YOUR_DOMAIN_NAME");
         request.AddUrlSegment ("name", "TEMPLATE_NAME");
         return client.Execute (request);
     }

 }

.. code-block:: go

    func GetTemplate(domain, apiKey string) (mailgun.Template, error) {
        mg := mailgun.NewMailgun(domain, apiKey)

        ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
        defer cancel()

        return mg.GetTemplate(ctx, "my-template")
    }

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.get('/domains/${DOMAIN}/templates/TEMPLATE_NAME', function (error, body) {
   console.log(body);
 });
