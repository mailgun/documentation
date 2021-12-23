.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' -X DELETE -G \
    https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME/versions/VERSION_TAG

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode deleteTemplateVersion() throws UnirestException {

         HttpResponse <JsonNode> request = Unirest.delete (
                                "https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/templates/TEMPLATE_NAME/versions/VERSION_TAG")
             .basicAuth("api", API_KEY)
             .asJson();

         return request.getBody();
     }
 }

.. code-block:: php

  # Currently, the PHP SDK does not support the Templates endpoint.
  # Consider using the following php curl function.
  function delete_template_version() {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME/versions/VERSION_TAG');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $params);

    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: py

 def delete_template_version():
     return requests.delete(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME/versions/VERSION_TAG",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def delete_template_version
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/templates/TEMPLATE_NAME/versions/VERSION_TAG"

 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class DeleteTemplateVersionChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (DeleteTemplateVersion ().Content.ToString ());
     }

     public static IRestResponse DeleteTemplateVersion ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();

         request.Resource = "/{domain}/templates/{name}/versions/{tag}";
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.AddParameter ("name", "TEMPLATE_NAME", ParameterType.UrlSegment);
         request.AddParameter ("tag", "VERSION_TAG", ParameterType.UrlSegment);

         request.Method = Method.DELETE
         return client.Execute (request);
     }

 }

.. code-block:: go

    import (
        "context"
        "github.com/mailgun/mailgun-go/v3"
        "time"
    )

    func DeleteTemplateVersion(domain, apiKey string) error {
        mg := mailgun.NewMailgun(domain, apiKey)

        ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
        defer cancel()

        // Delete the template version tagged as 'VERSION_TAG'
        return mg.DeleteTemplateVersion(ctx, "TEMPLATE_NAME", "VERSION_TAG")
    }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';
  const TEMPLATE_NAME = 'template.name';
  const VERSION_TAG = 'v1';

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const deletedVersion = await client.domains.domainTemplates.destroyVersion(
        DOMAIN,
        TEMPLATE_NAME,
        VERSION_TAG
      );
      console.log('deletedVersion', deletedVersion);
    } catch (error) {
      console.error(error);
    }
  })();

