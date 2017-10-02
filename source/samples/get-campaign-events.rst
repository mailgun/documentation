
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
	https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/campaigns/my_campaign_id/events?limit=2

.. code-block:: java

 import javaimport com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode getCampaignEvents() throws UnirestException {
 
         HttpResponse<JsonNode> request = Unirest.post("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/campaigns/{campaignID}/events")
             .basicAuth("api", API_KEY)
             .queryString("limit", 2)
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
  $campaignId = 'myexamplecampaign';

  # Make the call to the client.
  $result = $mgClient->get("$domain/campaigns/$campaignId/events", array(
      'skip'  => 0,
      'limit' => 50
  ));

.. code-block:: py

 def get_events_history():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/campaigns/my_campaign_id/events?limit=2",
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def get_events_history
   RestClient.get("https://api:YOUR_API_KEY"\
                  "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/campaigns/"\
                  "my_campaign_id/events?limit=2")
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetCampaignEventsChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetCampaignEvents ().Content.ToString ());
     }

     public static IRestResponse GetCampaignEvents ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "{domain}/campaigns/my_campaign_id/events";
         request.AddParameter ("limit", 2);
         return client.Execute (request);
     }

 }

.. code-block:: go

 // Not supported

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.get(`/${DOMAIN}/campaigns/my_campaign_id`, {"limit": 2}, function (error, body) {
   console.log(body);
 });
