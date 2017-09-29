
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
	-d "groupby=daily_hour&limit=2" \
	https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/campaigns/my_campaign_id/stats

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode getCampaignStatsByDailyHour() throws UnirestException {
 
         HttpResponse<JsonNode> request = Unirest.get("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/campaigns/{campaignID}/stats")
             .basicAuth("api", API_KEY)
             .queryString("groupby", "daily_hour")
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

  # Issue the call to the client.
  $result = $mgClient->get("$domain/campaigns/$campaignId/stats", array(
      'groupby' => 'daily_hour',
      'limit'   => 2
  ));

.. code-block:: py

 def get_campaign_stats():
     return requests.get(
         ("https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/campaigns"
          "/my_campaign_id/stats?groupby=daily_hour&limit=2"),
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def get_campaign_stats
   RestClient.get("https://api:YOUR_API_KEY"\
                  "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/campaigns/"\
                  "my_campaign_id/stats?groupby=daily_hour&limit=2")
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetCampaignStatsByDailyHourChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetCampaignStats ().Content.ToString ());
     }

     public static IRestResponse GetCampaignStats ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "{domain}/campaigns/my_campaign_id/stats";
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.AddParameter ("groupby", "daily_hour");
         request.AddParameter ("limit", 2);
         return client.Execute (request);
     }

 }

.. code-block:: go

 // Not supported

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.get(`${DOMAIN}campaigns/my_campaign_id/stats`, {"groupby" : "daily_hour", "limit" : 2}, function (error, body) {
  console.log(body);
 });
