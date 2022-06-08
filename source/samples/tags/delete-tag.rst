
.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' -X DELETE \
     https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/tags/newsletter

.. code-block:: java

    import com.mailgun.api.v3.MailgunTagsApi;
    import com.mailgun.model.ResponseWithMessage;

    // ...

    public ResponseWithMessage deleteTag() {
        MailgunTagsApi mailgunTagsApi = MailgunClient.config(API_KEY)
            .createApi(MailgunTagsApi.class);

        return mailgunTagsApi.deleteTag(YOUR_DOMAIN_NAME, TAG_NAME);
    }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $domain = 'YOUR_DOMAIN_NAME';
  $tag    = 'my_tag';

  # Issue the call to the client.
  $result = $mgClient->tags()->delete($domain, $tag);

.. code-block:: py

 def delete_tag():
     return requests.delete(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/tags/newsletter",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def delete_tag
   RestClient.delete "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/tag/newsletter"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class DeleteTagChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (DeleteTag ().Content.ToString ());
     }

     public static IRestResponse DeleteTag ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "{domain}/tags/{tag}";
         request.AddUrlSegment ("tag", "newsletter");
         request.Method = Method.DELETE;
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func DeleteTag(domain, apiKey string) error {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.DeleteTag(ctx, "newsletter")
 }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const deletedTag = await client.domains.domainTags.destroy(DOMAIN, 'YOUR_TAG_NAME');
      console.log('deletedTag', deletedTag);
    } catch (error) {
      console.error(error);
    }
  })();
