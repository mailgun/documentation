
.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' \
	https://api.mailgun.net/v2/samples.mailgun.org/campaigns \
	-F name='Newsletter' \
	-F id='my_campaign_id'

.. code-block:: java

 public static ClientResponse CreateCampaign() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/samples.mailgun.org/campaigns");
 	MultivaluedMapImpl formData = new MultivaluedMapImpl();
 	formData.add("name", "Newsletter");
 	formData.add("id", "my_campaign_id");
 	return webResource.type(MediaType.APPLICATION_FORM_URLENCODED).
 	post(ClientResponse.class, formData);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('key-3ax6xnjp29jd6fds4gc373sgvjxteol0');
  $domain = 'samples.mailgun.org';

  # Issue the call to the client.
  $result = $mgClient->post("$domain/campaigns", 
                      array('name' => 'Newsletter', 'id' => 'my_campaign_id'));
.. code-block:: py

 def create_campaign():
     return requests.post(
         "https://api.mailgun.net/v2/samples.mailgun.org/campaigns",
         auth=('api', 'key-3ax6xnjp29jd6fds4gc373sgvjxteol0'),
         data={'name': 'Newsletter',
               'id': 'my_campaign_id'})

.. code-block:: rb

 def create_campaign
   RestClient.post("https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0" \
                   "@api.mailgun.net/v2/samples.mailgun.org/campaigns",
                   :name => 'Newsletter',
                   :id => 'my_campaign_id') {
     |response, request, result| response
   }
 end

.. code-block:: csharp

 public static IRestResponse CreateCampaign() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.Resource = "{domain}/campaigns";
 	request.AddParameter("domain", "samples.mailgun.org",
 	                     ParameterType.UrlSegment);
 	request.AddParameter("name", "Newsletter");
 	request.AddParameter("id", "my_campaign_id");
 	request.Method = Method.POST;
 	return client.Execute(request);
 }
