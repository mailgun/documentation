
.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' -X DELETE \
     https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/tags/newsletter

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode deleteTag() throws UnirestException {
 
         HttpResponse <JsonNode> request = Unirest.delete("https://api.mailgun.net/v3/"+ YOUR_DOMAIN_NAME + "/tags/newsletter")
             .basicAuth("api", API_KEY)
             .asJson();
 
         return request.getBody();
     }
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');
  $domain = 'YOUR_DOMAIN_NAME';
  $tag = 'myexampletag';

  # Issue the call to the client.
  $result = $mgClient->delete("$domain/tags/$tag");

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

 func DeleteTag(domain, apiKey string) error {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.DeleteTag("newsletter")
 }

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.delete(`/${DOMAIN}/tags/newsletter`, function (error, body) {
   console.log(body);
 });
