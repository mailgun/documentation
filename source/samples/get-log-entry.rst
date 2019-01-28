
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -G \
      https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/log \
      -d skip=50 \
      -d limit=1

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode getLogEntry() throws UnirestException {
 
         HttpResponse<JsonNode> request = Unirest.get("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/log")
             .basicAuth("api", API_KEY)
             .queryString("limit", 1)
             .queryString("skip", 50)
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

  # Issue the call to the client.
  $result = $mgClient->get("$domain/log", array(
      'limit' => 5,
      'skip'  => 10
  ));

.. code-block:: py

 def get_logs():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/log",
         auth=("api", "YOUR_API_KEY"),
         params={"skip": 50,
                 "limit": 1})

.. code-block:: rb

 def get_logs
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/log", :params => {
     :skip => 50,
     :limit => 1
   }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetLogEntryChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetLogEntry ().Content.ToString ());
     }

     public static IRestResponse GetLogEntry ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "{domain}/log";
         request.AddParameter ("skip", 50);
         request.AddParameter ("limit", 1);
         return client.Execute (request);
     }

 }

.. code-block:: go

 // This feature is deprecated and not supported in the golang library

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.get(`/${DOMAIN}/log`, {"limit": 1, "skip": 50}, function (error, body) {
   console.log(body);
 });
