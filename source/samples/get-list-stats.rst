
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
	https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/stats

.. code-block:: java

 public static ClientResponse GetListStats() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v3/lists/" +
 				"LIST@YOUR_DOMAIN_NAME/stats");
 	return webResource.get(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');
  $listAddress = 'LIST@YOUR_DOMAIN_NAME';

  # Issue the call to the client.
  $result = $mgClient->get("lists/$listAddress/stats", array(
      'limit' => 5,
      'skip'  => 10
  ));

.. code-block:: py

 def get_list_stats():
     return requests.get(
         "https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/stats",
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def get_list_stats
   RestClient.get("https://api:YOUR_API_KEY" \
                  "@api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/stats")
 end

.. code-block:: csharp

 public static IRestResponse GetListStats() {
 	RestClient client = new RestClient();
 	client.BaseUrl = new Uri("https://api.mailgun.net/v2");
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
 	RestRequest request = new RestRequest();
 	request.Resource = "lists/{list}/stats";
 	request.AddParameter("list", "LIST@YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
 	return client.Execute(request);
 }

.. code-block:: go

 // Coming soon
