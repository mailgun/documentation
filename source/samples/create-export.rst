.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
    https://api.mailgun.net/v3/exports
    -F url='/v3/domains' \
    -x POST

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode createExports() throws UnirestException {
 
         HttpResponse<JsonNode> request = Unirest.post("https://api.mailgun.net/v3/exports")
             .basicAuth("api", API_KEY)
             .field("url", "/v3/domains")
             .asJson();
 
         return request.getBody();
     }
 }

.. code-block:: php

    Exports are unsupported in the php client bindings

.. code-block:: py

 def create_export():
     return requests.post(
         "https://api.mailgun.net/v3/exports",
         auth=("api", "YOUR_API_KEY"),
         data={"url": "/v3/domains"})

.. code-block:: rb

 def create_export
   data = {}
   data[:url] = "v3/domains"
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/exports", data
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class CreateExportChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (CreateExport ().Content.ToString ());
     }

     public static IRestResponse CreateExport () {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3/");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest();
         request.Resource = "exports";
         request.Method = Method.POST;
         request.AddParameter ("url", "/v3/domains");
         return client.Execute (request);
     }
 }

.. code-block:: go

    Exports are unsupported in the go client bindings

.. code-block:: node

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.post('/exports', {"url": "/v3/domains"}, function (error, body) {
   console.log(body);
 });
