
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
	-d "groupby=recipient&limit=2" \
	https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/campaigns/my_campaign_id/clicks

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode getClicks() throws UnirestException{

      HttpResponse<JsonNode> request = Unirest.get("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/campaigns/{campaignID}/clicks")
          .basicAuth("api", API_KEY)
          .queryString("groupby", "recipient")
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
  $result = $mgClient->get("$domain/campaigns/$campaignId/clicks", array(
      'groupby' => 'recipient',
      'limit'   => 2
  ));

.. code-block:: py

 def get_clicks():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/campaigns/my_campaign_id/clicks?groupby=recipient&limit=2",
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def get_clicks
   RestClient.get("https://api:YOUR_API_KEY"\
                  "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/campaigns/"\
                  "my_campaign_id/clicks?groupby=recipient&limit=2")
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetCampaignRecipientsWhoClickedChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetCampaignClickStats ().Content.ToString ());
     }

     public static IRestResponse GetCampaignClickStats ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "{domain}/campaigns/my_campaign_id/clicks";
         request.AddParameter ("groupby", "recipient");
         request.AddParameter ("limit", 2);
         return client.Execute (request);
     }

 }

.. code-block:: go

 // Not supported

.. code-block:: node

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.get(`${DOMAIN}campaigns/my_campaign_id/clicks`, {"groupby" : "recipient", "limit" : 2}, function (error, body) {
   console.log(body);
 });
