.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' -G \
    https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/tags \
    -d limit=10

.. code-block:: java

    import com.mailgun.api.v3.MailgunTagsApi;
    import com.mailgun.model.tags.TagsResult;

    // ...

    public TagsResult getTags() {
        MailgunTagsApi mailgunTagsApi = MailgunClient.config(API_KEY)
            .createApi(MailgunTagsApi.class);

        return mailgunTagsApi.getAllTags(YOUR_DOMAIN_NAME, 10);
    }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $domain = 'YOUR_DOMAIN_NAME';

  # Issue the call to the client.
  $result = $mgClient->tags()->index($domain);

.. code-block:: py

 def get_stats():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/tags",
         auth=("api", "YOUR_API_KEY"),
         params={"limit": 10})

.. code-block:: rb

 def get_stats
   url_params = {}
   url_params[:limit] = 10
   query_string = url_params.collect {|k, v| "#{k.to_s}=#{CGI::escape(v.to_s)}"}.
     join("&")
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/tags?#{query_string}"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetTagsChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetTags ().Content.ToString ());
     }

     public static IRestResponse GetTags ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "{domain}/tags";
         request.AddParameter ("limit", 10);
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func ListTags(domain, apiKey string) ([]mailgun.Tag, error) {
     mg := mailgun.NewMailgun(domain, apiKey)
     it := mg.ListTags(nil)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     var page, result []mailgun.Tag
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

 mailgun.get(`/${DOMAIN}/tags`, {"limit": 10}, function (error, body) {
   console.log(body);
 });
