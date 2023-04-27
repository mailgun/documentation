
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -X POST \
    https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates \
    -F template='<div class="entry"> <h1>{{title}}</h1> <div class="body"> {{body}} </div> </div>' \
    -F name = 'template.test'
    -F description='Sample template'

.. code-block:: java

    import com.mailgun.api.v3.MailgunTemplatesApi;
    import com.mailgun.model.templates.TemplateRequest;
    import com.mailgun.model.templates.TemplateWithMessageResponse;

    // ...

    public TemplateWithMessageResponse createTemplate() {
        MailgunTemplatesApi mailgunTemplatesApi = MailgunClient.config(API_KEY)
            .createApi(MailgunTemplatesApi.class);

        TemplateRequest request = TemplateRequest.builder()
            .template("<div class=\"entry\"> <h1>{{title}}</h1> <div class=\"body\"> {{body}} </div> </div>")
            .name("template.name")
            .description("Sample template")
            .build();

        return mailgunTemplatesApi.storeNewTemplate(YOUR_DOMAIN_NAME, request);
    }

.. code-block:: php

  # Currently, the PHP SDK does not support the Templates endpoint.
  # Consider using the following php curl function.
  function add_template() {
    $params = array(
      'template'    => '<div class="entry"> <h1>{{title}}</h1> <div class="body"> {{body}} </div> </div>',
      'name'        => 'Test template',
      'description' => 'sample_template'
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

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  import formData from 'form-data';
  import Mailgun from 'mailgun.js';

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const createdTemplate = await client.domains.domainTemplates.create(DOMAIN, {
        name: 'template.test',
        description: 'Sample template',
        template: "<div class=\"entry\"> <h1>{{title}}</h1> <div class=\"body\"> {{body}} </div> </div>",
        tag: 'v1',
        comment: 'comment text'
      });
      console.log('createdTemplate', createdTemplate);
    } catch (error) {
        console.error(error);
    }
  })();

