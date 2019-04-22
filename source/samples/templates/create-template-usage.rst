
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -X POST \
    https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates \
    -F template='<div class="entry"> <h1>{{title}}</h1> <div class="body"> {{body}} </div> </div>' \
    -F name = 'template.test'
    -F description='Sample template'

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
 			.field("template", "<div class=\"entry\"> <h1>{{title}}</h1> <div class=\"body\"> {{body}} </div> </div>")
            .field("name", "Test template")
            .field("description", "Sample template")
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
      'template' => '<div class="entry"> <h1>{{title}}</h1> <div class="body"> {{body}} </div> </div>',
      'name' => 'Test template',
      'description' => 'Sample tempalte'
  ));

.. code-block:: py

 def add_template():
     return requests.post(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates",
         auth=("api", "YOUR_API_KEY"),
         data={'template': '<div class="entry"> <h1>{{title}}</h1> <div class="body"> {{body}} </div> </div>',
               'name': 'Test template',
               'description': 'Sample template'})

.. code-block:: rb

 def add_template
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates",
   :template => '<div class="entry"> <h1>{{title}}</h1> <div class="body"> {{body}} </div> </div>',
   :name => 'Test template',
   :description: => 'Sample template'
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class CreateTemplatesChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (CreateTemplate ().Content.ToString ());
     }

     public static IRestResponse CreateTemplate ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "{domain}/templates";
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.AddParameter ("template", "<div class=\"entry\"> <h1>{{title}}</h1> <div class=\"body\"> {{body}} </div> </div>");
         request.AddParameter ("description", "Sample template");
         reuqest.AddParameter ("name", "Test template");
         request.Method = Method.POST;
         return client.Execute (request);
     }

 }

.. code-block:: go

    import (
        "context"
        "github.com/mailgun/mailgun-go/v3"
        "time"
    )

    func SendMessageWithTemplate(domain, apiKey string) error {
        mg := mailgun.NewMailgun(domain, apiKey)
        var err error

        ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
        defer cancel()

        // Create a new template
        err = mg.CreateTemplate(ctx, &mailgun.Template{
            Name: "my-template",
            Version: mailgun.TemplateVersion{
                Template: `'<div class="entry"> <h1>{{.title}}</h1> <div class="body"> {{.body}} </div> </div>'`,
                Engine:   mailgun.TemplateEngineGo,
                Tag:      "v1",
            },
        })
        if err != nil {
            return err
        }

        // Give time for template to show up in the system.
        time.Sleep(time.Second * 1)

        // Create a new message with template
        m := mg.NewMessage("Excited User <excited@example.com>", "Template example", "")
        m.SetTemplate("my-template")

        // Add recipients
        m.AddRecipient("bob@example.com")
        m.AddRecipient("alice@example.com")

        // Add the variables to be used by the template
        m.AddVariable("title", "Hello Templates")
        m.AddVariable("body", "Body of the message")

        _, id, err := mg.Send(ctx, m)
        return err
    }

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.post(`/${DOMAIN}/templates`,
              {"template" : "<div class=\"entry\"> <h1>{{title}}</h1> <div class=\"body\"> {{body}} </div> </div>",
               "name": "Test template"
               "description": "Sample template"},
                               function (error, body) {
                                        console.log(body);
                               }
              );

