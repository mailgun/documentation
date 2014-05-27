
.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' -G \
	https://api.mailgun.net/v2/samples.mailgun.org/campaigns/my_campaign_id/events?limit=2

.. code-block:: java

 public static ClientResponse GetEventsHistory() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/samples.mailgun.org/campaigns/my_campaign_id/events");
 	MultivaluedMapImpl queryParams = new MultivaluedMapImpl();
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

  # Make the call to the client.
  $result = $mgClient->get("$domain/campaigns/$campaignId/events", array(
      'skip'  => 0,
      'limit' => 50
  ));

.. code-block:: py

 def get_events_history():
     return requests.get(
         "https://api.mailgun.net/v2/samples.mailgun.org/campaigns/my_campaign_id/events?limit=2",
         auth=('api', 'key-3ax6xnjp29jd6fds4gc373sgvjxteol0'))

.. code-block:: rb

 def get_events_history
   RestClient.get("https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
                  "@api.mailgun.net/v2/samples.mailgun.org/campaigns/"\
                  "my_campaign_id/events?limit=2")
 end

.. code-block:: csharp

 public static IRestResponse GetEventsHistory() {
     RestClient client = new RestClient();
     client.BaseUrl = "https://api.mailgun.net/v2";
     client.Authenticator =
	new HttpBasicAuthenticator("api",
	                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
     RestRequest request = new RestRequest();
     request.AddParameter("domain",
                           "samples.mailgun.org", ParameterType.UrlSegment);
     request.Resource = "{domain}/campaigns/my_campaign_id/events";
     request.AddParameter("limit", 2);
     return client.Execute(request);
 }
