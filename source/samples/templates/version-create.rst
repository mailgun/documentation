.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -X POST \
    https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME/versions \
    -F tag='v0' \
    -F template='{{fname}} {{lname}}' \
    -F engine='handlebars'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

      // ...

     public static JsonNode storeTemplateVersion() throws UnirestException {

         HttpResponse <JsonNode> request = Unirest.post("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/templates/TEMPLATE_NAME/versions")
            .basicAuth("api", API_KEY)
            .field("tag", "v0")
            .field("template", "{{fname}} {{lname}}")
            .field("engine", "handlebars")
            .asJson();

         return request.getBody();
     }
 }

.. code-block:: php

  # Currently, the PHP SDK does not support the Templates endpoint.
  # Consider using the following php curl function.
  function create_template_version() {
    $params = array(
      'tag' => 'v0',
      'template' => '{{fname}} {{lname}}',
      'engine' => 'handlebars'
    );

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME/versions');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $params);

    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: py

 def store_template_version():
     return requests.post(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME/versions",
         auth=("api", "YOUR_API_KEY"),
         data={'tag': 'v0',
               'template': '{{fname}} {{lname}}',
               'engine': 'handlebars'})

.. code-block:: rb

 def store_template_version
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME/versions",
   :tag => 'v0',
   :template => '{{fname}} {{lname}}',
   :engine => 'handlebars'
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class StoreTemplateVersionChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (StoreTemplateVersion ().Content.ToString ());
     }

     public static IRestResponse StoreTemplateVersion ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "{domain}/templates/{name}/versions";
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.AddParameter ("name", "TEMPLATE_NAME", ParameterType.UrlSegment);
         request.AddParameter ("tag", "v0");
         request.AddParameter ("template", "{{fname}} {{lname}}");
         request.AddParameter ("engine", "handlebars");
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

    func AddTemplateVersion(domain, apiKey string) error {
        mg := mailgun.NewMailgun(domain, apiKey)

        ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
        defer cancel()

        return mg.AddTemplateVersion(ctx, "TEMPLATE_NAME", &mailgun.TemplateVersion{
            Template: `'<div class="entry"> <h1>{{.title}}</h1> <div class="body"> {{.body}} </div> </div>'`,
            Engine:   mailgun.TemplateEngineGo,
            Tag:      "v2",
            Active:   true,
        })
    }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';
  const TEMPLATE_NAME = 'template.name';
  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const createdTemplateVersion = await client.domains.domainTemplates.createVersion(
        DOMAIN,
        TEMPLATE_NAME,
        {
          description: 'template description',
          template: '{{fname}} {{lname}}',
          tag: 'v2',
          comment: 'comment',
          active: 'yes'
        }
      );
      console.log('createdTemplateVersion', createdTemplateVersion);
    } catch (error) {
      console.error(error);
    }
  })();

