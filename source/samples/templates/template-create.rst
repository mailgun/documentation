.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -X POST \
    https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates \
    -F name='template.name' \
    -F description='template description'

.. code-block:: java

    import com.mailgun.api.v3.MailgunTemplatesApi;
    import com.mailgun.model.templates.TemplateRequest;
    import com.mailgun.model.templates.TemplateWithMessageResponse;

    // ...

    public TemplateWithMessageResponse createTemplate() {
        MailgunTemplatesApi mailgunTemplatesApi = MailgunClient.config(API_KEY)
            .createApi(MailgunTemplatesApi.class);

        TemplateRequest request = TemplateRequest.builder()
            .name("template.name")
            .description("template description")
            .build();

        return mailgunTemplatesApi.storeNewTemplate(YOUR_DOMAIN_NAME, request);
    }

.. code-block:: php

  # Currently, the PHP SDK does not support the Templates endpoint.
  # Consider using the following php curl function.
  function create_template() {
    $params = array(
      'name' => 'template.name',
      'description' => 'template description',
    );

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $params);

    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }
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

  const DOMAIN = 'YOUR_DOMAIN_NAME';
  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const createdTemplate = await client.domains.domainTemplates.create(DOMAIN, {
        name: 'template.test',
        description: 'template description',
        template: "<div class=\"entry\"> <h1>{{title}}</h1> <div class=\"body\"> {{body}} </div> </div>",
        tag: 'v1',
        comment: 'comment text'
      });
      console.log('createdTemplate', createdTemplate);
    } catch (error) {
        console.error(error);
    }
  })();
