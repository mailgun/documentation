
.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' -X DELETE \
     https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/ips/127.0.0.1

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode deleteDomainIP() throws UnirestException {
 
         HttpResponse<JsonNode> request = Unirest.delete("https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/ips/127.0.0.1")
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
  $ip = '127.0.0.1';

  # Issue the call to the client.
  $result = $mgClient->delete("$domain/ips/$ip");

.. code-block:: py

 def delete_domain_ip():
     return requests.delete(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/ips/127.0.0.1",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def delete_domain_ip
   RestClient.delete "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/ips/127.0.0.1"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class DeleteDomainIPChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (DeleteDomainIP ().Content.ToString ());
     }

     public static IRestResponse DeleteDomainIP ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "{domain}/ips/{ip}";
         request.AddUrlSegment ("ip", "127.0.0.1");
         request.Method = Method.DELETE;
         return client.Execute (request);
     }

 }

.. code-block:: go

 func RemoveDomainIP(domain, apiKey string) error {
        mg := mailgun.NewMailgun(domain, apiKey, "")
        return mg.RemoveDomainIP("YOUR_DOMAIN_NAME", "127.0.0.1")
 }

.. code-block:: node

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.delete(`/${DOMAIN}/ips/127.0.0.1`, function (error, body) {
   console.log(body);
 });
