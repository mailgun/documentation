.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' -G \
    https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/limits/tag

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode getLimitsTag() throws UnirestException {

         HttpResponse <JsonNode> request = Unirest.get("https://api.mailgun.net/v3/domains/"+ YOUR_DOMAIN_NAME + "/limits/tag")
             .basicAuth("api", API_KEY)
             .asJson();

         return request.getBody();
     }
 }

.. code-block:: php

  # Currently, the PHP SDK does not support Domain Tag limits.
  # Consider using the following php curl function.
  function get_domain_tag_limit() {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/limits/tag');

    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: py

 def get_stats():
     return requests.get(
         "https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/limits/tag",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_stats
   url_params = {}
   url_params[:limit] = 10
   query_string = url_params.collect {|k, v| "#{k.to_s}=#{CGI::escape(v.to_s)}"}.
     join("&")
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/limits/tag"
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
         request.Resource = "domains/{domain}/limits/tag";
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func GetTagLimits(domain, apiKey string) (mailgun.TagLimits, error) {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.GetTagLimits(ctx, domain)
 }

.. code-block:: js

 // This feature is deprecated and not supported in the js library
