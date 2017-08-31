
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/campaigns \
	-F name='Newsletter' \
	-F id='my_campaign_id'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode createCampaign() throws UnirestException {
 
         HttpResponse<JsonNode> request = Unirest.post("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/campaigns")
             .basicAuth("api", API_KEY)
             .field("name", "Newsletter")
             .field("id", "my_campaign_id")
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
  $result = $mgClient->post("$domain/campaigns", array(
      'name' => 'Newsletter',
      'id'   => 'my_campaign_id'
  ));
.. code-block:: py

 def create_campaign():
     return requests.post(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/campaigns",
         auth=('api', 'YOUR_API_KEY'),
         data={'name': 'Newsletter',
               'id': 'my_campaign_id'})

.. code-block:: rb

 def create_campaign
   RestClient.post("https://api:YOUR_API_KEY" \
                   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/campaigns",
                   :name => 'Newsletter',
                   :id => 'my_campaign_id') {
     |response, request, result| response
   }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class CreateCampaignChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (CreateCampaign ().Content.ToString ());
     }

     public static IRestResponse CreateCampaign ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "{domain}/campaigns";
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.AddParameter ("name", "Newsletter");
         request.AddParameter ("id", "my_campaign_id");
         request.Method = Method.POST;
         return client.Execute (request);
     }

 }

.. code-block:: go

 // not supported

.. code-block:: node

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.post(`/${DOMAIN}/campaigns`, {'name': 'Newsletter', 'id': 'my_campaign_id'}, function (error, body) {
   console.log(body);
 });
