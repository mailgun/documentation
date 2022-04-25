
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -X PUT \
        https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME \
        -F description = 'new template description'

.. code-block:: java

    import com.mailgun.api.v3.MailgunTemplatesApi;
    import com.mailgun.model.templates.TemplateStatusResponse;

    // ...

    public TemplateStatusResponse updateTemplate() {
        MailgunTemplatesApi mailgunTemplatesApi = MailgunClient.config(API_KEY)
            .createApi(MailgunTemplatesApi.class);

        return mailgunTemplatesApi.updateTemplate(YOUR_DOMAIN_NAME, TEMPLATE_NAME, "new template description");
    }

.. code-block:: php

  # Currently, the PHP SDK does not support the Templates endpoint.
  # Consider using the following php curl function.
  function update_template() {
    $params = array(
      'description' => 'new template description'
    );

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $params);

    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

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

    import (
        "context"
        "github.com/mailgun/mailgun-go/v3"
        "time"
    )

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

  const DOMAIN = 'YOUR_DOMAIN_NAME';
  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const updatedDomainTemplate = await client.domains.domainTemplates.update(
      DOMAIN,
      'YOUR_TEMPLATE_NAME',
      {
          description: 'new template description'
      });
      console.log('updatedDomainTemplate', updatedDomainTemplate);
    } catch (error) {
      console.error(error);
    }
  })();
