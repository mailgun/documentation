
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -X GET \
    https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME \
    -F active='yes'

.. code-block:: java

    import com.mailgun.api.v3.MailgunTemplatesApi;
    import com.mailgun.model.templates.TemplateWithVersionResponse;

    // ...

    public TemplateWithVersionResponse getTemplate() {
        MailgunTemplatesApi mailgunTemplatesApi = MailgunClient.config(API_KEY)
            .createApi(MailgunTemplatesApi.class);

        return mailgunTemplatesApi.getActiveTemplateVersionContent(YOUR_DOMAIN_NAME, TEMPLATE_NAME);
    }

.. code-block:: php

  # Currently, the PHP SDK does not support the Templates endpoint.
  # Consider using the following php curl function.
  function get_active_template() {

    $params = array(
        'active' => 'yes'
    );

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $params);

    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

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

  const DOMAIN = 'YOUR_DOMAIN_NAME';
  
  import formData from 'form-data';
  import Mailgun from 'mailgun.js';

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const domainTemplateWithActiveVersion = await client.domains.domainTemplates.get(DOMAIN, 'YOUR_TEMPLATE_NAME', { active: 'yes' });
      console.log('domainTemplateWithActiveVersion', domainTemplateWithActiveVersion);
    } catch (error) {
      console.error(error);
    }
  })();
