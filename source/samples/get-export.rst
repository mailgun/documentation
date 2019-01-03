.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' \
      https://api.mailgun.net/v3/exports/EXPORT_ID

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode getExport() throws UnirestException {
 
         HttpResponse<JsonNode> request = Unirest.get("https://api.mailgun.net/v3/exports/EXPORTS_ID")
             .basicAuth("api", API_KEY)
             .queryString("url", "/v3/domains")
             .asJson();
 
         return request.getBody();
     }
 }

.. code-block:: php

    Exports are unsupported in the php client bindings

.. code-block:: py

 def get_export():
     return requests.get(
         "https://api.mailgun.net/v3/exports/EXPORT_ID",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_export
   RestClient.get("https://api:YOUR_API_KEY"\
                  "@api.mailgun.net/v3/exports/EXPORT_ID"\
                  {|response, request, result| response }
 end

.. code-block:: csharp

 public static IRestResponse GetExport() {
     RestClient client = new RestClient();
     client.BaseUrl = new Uri("https://api.mailgun.net/v3");
     client.Authenticator = new HttpBasicAuthenticator("api", "YOUR_API_KEY");
     RestRequest request = new RestRequest();
     request.AddParameter("id", "EXPORT_ID", ParameterType.UrlSegment);
     request.Resource = "/exports/{id}";
     return client.Execute(request);
 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func GetExport(domain, apiKey string) (mailgun.Export, error) {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.GetExport(ctx, "EXPORT_ID")
 }

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.get('/exports/exports_id', {"url": "/v3/domains"}, function (error, body) {
   console.log(body);
 });
