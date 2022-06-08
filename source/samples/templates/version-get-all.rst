.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -G \
    https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME/versions
    -d limit=10

.. code-block:: java

    import com.mailgun.api.v3.MailgunTemplatesApi;
    import com.mailgun.model.templates.TemplateAllVersionsResponse;

    // ...

    public TemplateAllVersionsResponse listTemplateVersions() {
        MailgunTemplatesApi mailgunTemplatesApi = MailgunClient.config(API_KEY)
            .createApi(MailgunTemplatesApi.class);

        return mailgunTemplatesApi.getAllTemplateVersions(YOUR_DOMAIN_NAME, TEMPLATE_NAME);
    }

.. code-block:: php

  # Currently, the PHP SDK does not support the Templates endpoint.
  # Consider using the following php curl function.
  function get_all_versions() {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME/versions');

    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: py

 def list_template_versions():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME/versions",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def list_template_version
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME/versions"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class ListTemplateVersionsChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (ListTemplateVersions ().Content.ToString ());
     }

     public static IRestResponse GetTemplateVersion ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.AddParameter ("name", "TEMPLATE_NAME", ParameterType.UrlSegment);
         request.Resource = "/{domain}/templates/{name}/versions";
         return client.Execute (request);
     }

 }

.. code-block:: go

    import (
        "context"
        "github.com/mailgun/mailgun-go/v3"
        "time"
    )

    func ListTemplateVersions(domain, apiKey string) ([]mailgun.TemplateVersion, error) {
        mg := mailgun.NewMailgun(domain, apiKey)
        it := mg.ListTemplateVersions("TEMPLATE_NAME", nil)

        ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
        defer cancel()

        var page, result []mailgun.TemplateVersion
        for it.Next(ctx, &page) {
            result = append(result, page...)
        }

        if it.Err() != nil {
            return nil, it.Err()
        }
        return result, nil
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
      const domainTemplateVersions = await client.domains.domainTemplates.listVersions(DOMAIN, TEMPLATE_NAME);
      console.log('domainTemplateVersions', domainTemplateVersions);
    } catch (error) {
      console.error(error);
    }
  })();

