
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -X PUT \
        https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME \
        -F description = 'new template description'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode updateTemplate() throws UnirestException {

         HttpResponse <JsonNode> request = Unirest.put("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/templates" +TEMPLATE_NAME)
             .basicAuth("api", API_KEY)
             .field("description", "new template description")
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

  # Issue the call to the client.
  $result = $mgClient->put("$domain/templates/$name", array(
      'description' => 'new template description'
  ));

.. code-block:: py

 def update_template():
     return requests.put(
         ("https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME"),
         auth=('api', 'YOUR_API_KEY'),
         data={'description': 'new template description'})

.. code-block:: rb

 def update_template
   RestClient.put("https://api:YOUR_API_KEY" \
                  "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME",
                  :description => 'new template description')
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
         request.Resource = "/YOUR_DOMAIN_NAME/template/TEMPLATE_NAME";
         request.AddParameter ("description", "new template description");
         request.Method = Method.PUT;
         return client.Execute (request);
     }

 }

.. code-block:: go

    func UpdateTemplate(domain, apiKey string) error {
        mg := mailgun.NewMailgun(domain, apiKey)

        ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
        defer cancel()

        return mg.UpdateTemplate(ctx, &mailgun.Template{
            Name:        "TEMPLATE_NAME",
            Description: "Add a description to the template",
        })
    }

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.put(`/${DOMAIN}/templates/TEMPLATE_NAME`, {"description": "new template descripton"},
                                                   function (error, body) {
                                                        console.log(body);
                                                   });
