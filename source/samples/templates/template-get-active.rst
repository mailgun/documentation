
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' \
    https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME \
    -F active='yes'

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
              .queryString("active", "yes")
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
  $result = $mgClient->get("$domain/templates/$name", array('active' => 'yes'));

.. code-block:: py

 def get_template():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME",
         auth=("api", "YOUR_API_KEY"),
         params={"active": "yes"})

.. code-block:: rb

 def get_template
    RestClient.get "https://api:YOUR_API_KEY"\
    "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME", :params => {
        :active => "yes"
    }
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
         request.AddParameter ("active", "yes");
         return client.Execute (request);
     }

 }

.. code-block:: go

    func ListActiveTemplates(domain, apiKey string) ([]mailgun.Template, error) {
        mg := mailgun.NewMailgun(domain, apiKey)
        it := mg.ListTemplates(&mailgun.ListTemplateOptions{Active: true})

        ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
        defer cancel()

        var page, result []mailgun.Template
        for it.Next(ctx, &page) {
            result = append(result, page...)
        }

        if it.Err() != nil {
            return nil, it.Err()
        }
        return result, nil
    }

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.get('/${DOMAIN}/templates/TEMPLATE_NAME', {"active", "yes"}, function (error, body) {
   console.log(body);
 });
