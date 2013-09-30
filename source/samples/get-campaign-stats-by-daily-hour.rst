
.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' -G \
	-d "groupby=daily_hour&limit=2" \
	https://api.mailgun.net/v2/samples.mailgun.org/campaigns/my_campaign_id/stats

.. code-block:: java

 public static ClientResponse GetCampaignStats() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/samples.mailgun.org/campaigns/my_campaign_id/stats");
 	MultivaluedMapImpl queryParams = new MultivaluedMapImpl();
 	queryParams.add("groupby", "daily_hour");
 	queryParams.add("limit", 2);
 	return webResource.queryParams(queryParams).get(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('key-3ax6xnjp29jd6fds4gc373sgvjxteol0');
  $domain = 'samples.mailgun.org';
  $campaignId = 'myexamplecampaign';

  # Issue the call to the client.
  $result = $mgClient->get("$domain/campaigns/$campaignId/stats", 
                     array('groupby' => 'daily_hour', 'limit' => 2));

.. code-block:: py

 def get_campaign_stats():
     return requests.get(
         ("https://api.mailgun.net/v2/samples.mailgun.org/campaigns"
          "/my_campaign_id/stats?groupby=daily_hour&limit=2"),
         auth=('api', 'key-3ax6xnjp29jd6fds4gc373sgvjxteol0'))

.. code-block:: rb

 def get_campaign_stats
   RestClient.get("https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
                  "@api.mailgun.net/v2/samples.mailgun.org/campaigns/"\
                  "my_campaign_id/stats?groupby=daily_hour&limit=2")
 end

.. code-block:: csharp

 public static RestResponse GetCampaignStats() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.Resource = "{domain}/campaigns/my_campaign_id/stats";
 	request.AddParameter("domain",
 	                     "samples.mailgun.org", ParameterType.UrlSegment);
 	request.AddParameter("groupby", "daily_hour");
 	request.AddParameter("limit", 2);
 	return client.Execute(request);
 }
