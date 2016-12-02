
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
	-d "groupby=recipient&limit=2" \
	https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/campaigns/my_campaign_id/clicks

.. code-block:: java

 public static ClientResponse GetClicks() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/campaigns/my_campaign_id/clicks");
 	MultivaluedMapImpl queryParams = new MultivaluedMapImpl();
                queryParams.add("groupby", "recipient");
 	queryParams.add("limit", 2);
 	return webResource.queryParams(queryParams).get(ClientResponse.class);
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
