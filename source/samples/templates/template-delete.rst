.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' -X DELETE \
     https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME

.. code-block:: java

    import com.mailgun.api.v3.MailgunTemplatesApi;
    import com.mailgun.model.templates.TemplateStatusResponse;

    // ...

    public TemplateStatusResponse deleteTemplate() {
        MailgunTemplatesApi mailgunTemplatesApi = MailgunClient.config(API_KEY)
            .createApi(MailgunTemplatesApi.class);

        return mailgunTemplatesApi.deleteTemplate(YOUR_DOMAIN_NAME, TEMPLATE_NAME);
    }

.. code-block:: php

  # Currently, the PHP SDK does not support the Templates endpoint.
  # Consider using the following php curl function.
  function delete_template() {

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME');

    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: rb

 def delete_template
   RestClient.delete "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class DeleteTemplate
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (DeleteTemplate ().Content.ToString ());
     }

     public static IRestResponse DeleteTemplate ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "{domain}/templates/{name}";
         request.AddUrlSegment ("name", "TEMPLATE_NAME");
         request.Method = Method.DELETE;
         return client.Execute (request);
     }

 }

.. code-block:: go

    func DeleteTemplate(domain, apiKey string) error {
        mg := mailgun.NewMailgun(domain, apiKey)

        ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
        defer cancel()

        return mg.DeleteTemplate(ctx, "TEMPLATE_NAME")
    }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';
  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const deletedDomainTemplate = await client.domains.domainTemplates.destroy(
        DOMAIN,
       'YOUR_TEMPLATE_NAME'
      );
      console.log('deletedDomainTemplate', deletedDomainTemplate);
    } catch (error) {
        console.error(error);
    }
  })();


