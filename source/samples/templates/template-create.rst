.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -X POST \
    https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates \
    -F name='template.name' \
    -F description='template description'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
      // ...
 
     public static JsonNode createTemplate() throws UnirestException {
 
         HttpResponse <JsonNode> request = Unirest.post("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/templates")
 			.basicAuth("api", API_KEY)
 			.field("name", "template.name")
            .field("description", "template description")
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
      'name' => 'template.name',
      'description' => 'template description'
  ));

.. code-block:: py

 def store_template():
     return requests.post(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates",
         auth=("api", "YOUR_API_KEY"),
         data={'name': 'template.name',
               'description': 'template description'})

.. code-block:: rb

 def store_template
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates",
   :name=> 'template.name',
   :description: => 'template description'
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
         request.AddParameter ("name", "template.name");
         request.AddParameter ("description", "template description")
         request.Method = Method.POST;
         return client.Execute (request);
     }

 }

.. code-block:: go

    func CreateTemplate(domain, apiKey string) error {
        mg := mailgun.NewMailgun(domain, apiKey)

        ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
        defer cancel()

        return mg.CreateTemplate(ctx, &mailgun.Template{
            Name: "template.name",
            Version: mailgun.TemplateVersion{
                Template: `'<div class="entry"> <h1>{{.title}}</h1> <div class="body"> {{.body}} </div> </div>'`,
                Engine:   mailgun.TemplateEngineGo,
                Tag:      "v1",
            },
        })
    }

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.post(`/${DOMAIN}/templates`, {"name" : "template.name",
                                       "description": "template description"},
                                       function (error, body) {
                                            console.log(body);
                                       });

