
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
	-d "recipient=baz@example.com&limit=2" \
	https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/campaigns/my_campaign_id/events

.. code-block:: java

 import javax.ws.rs.client.Client;
 import javax.ws.rs.client.ClientBuilder;
 import javax.ws.rs.client.Entity;
 import javax.ws.rs.client.WebTarget;

 import javax.ws.rs.core.Form;
 import javax.ws.rs.core.MediaType;

 import org.glassfish.jersey.client.authentication.HttpAuthenticationFeature;

 public class MGSample {

     // ...

     public static ClientResponse GetCampaignRecipientHistory() {

         Client client = ClientBuilder.newClient();
         client.register(HttpAuthenticationFeature.basic(
             "api",
             "YOUR_API_KEY"
         ));

         WebTarget mgRoot = client.target("https://api.mailgun.net/v3");

         return mgRoot
             .path("/{domain}/campaigns/{campaign_id}/events")
             .resolveTemplate("domain", "YOUR_DOMAIN_NAME")
             .resolveTemplate("campaign_id", "YOUR_CAMPAIGN_ID")
             .queryParam("recipient", "bob@example.com")
             .queryParam("limit", 2)
             .request()
             .buildGet()
             .invoke(ClientResponse.class);
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
  $result = $mgClient->get("$domain/campaigns/$campaignId/events", array(
      'recipient' => 'user@example.com',
      'limit' => 2
  ));

.. code-block:: py

 def get_campaign_recipient_history():
     return requests.get(
         ("https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/campaigns"
          "/my_campaign_id/events?recipient=baz@example.com&limit=2"),
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def get_campaign_recipient_history
   RestClient.get("https://api:YOUR_API_KEY"\
                  "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/campaigns/"\
                  "my_campaign_id/events?recipient=baz@example.com&limit=2")
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;
 
 public class GetCampaignRecipientHistoryChunk
 {
 
     public static void Main (string[] args)
     {
         Console.WriteLine (GetCampaignRecipientHistory ().Content.
                            ToString ());
     }
 
     public static IRestResponse GetCampaignRecipientHistory ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "{domain}/campaigns/my_campaign_id/events";
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.AddParameter ("recipient", "baz@example.com");
         request.AddParameter ("limit", 2);
         return client.Execute (request);
     }
 
 }

.. code-block:: go

 // Not supported
