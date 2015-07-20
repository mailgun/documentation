
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
	https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/campaigns/my_campaign_id/stats

.. code-block:: java

 public static ClientResponse GetCampaignStats() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/campaigns/my_campaign_id/stats");
 	return webResource.get(ClientResponse.class);
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
  $result = $mgClient->get("$domain/campaings/$campaignId/stats");

.. code-block:: py

 def get_campaign_stats():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/campaigns/my_campaign_id/stats",
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def get_campaign_stats
   RestClient.get("https://api:YOUR_API_KEY"\
                  "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/campaigns/"\
                  "my_campaign_id/stats")
 end

.. code-block:: csharp

 public static IRestResponse GetCampaignStats() {
 	RestClient client = new RestClient();
 	client.BaseUrl = new Uri("https://api.mailgun.net/v3");
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
 	RestRequest request = new RestRequest();
 	request.Resource = "{domain}/campaigns/my_campaign_id/stats";
 	request.AddParameter("domain",
 	                     "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
 	return client.Execute(request);
 }

.. code-block:: go

 // Not supported
