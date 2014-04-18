
.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' -G \
	https://api.mailgun.net/v2/routes \
	-d skip=1 \
	-d limit=1

.. code-block:: java

 public static ClientResponse GetRoutes() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/routes");
 	MultivaluedMapImpl queryParams = new MultivaluedMapImpl();
 	queryParams.add("skip", 1);
 	queryParams.add("limit", 1);
 	return webResource.queryParams(queryParams).get(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('key-3ax6xnjp29jd6fds4gc373sgvjxteol0');

  # Issue the call to the client.
  $result = $mgClient->get("routes", array('skip' => 5, 'limit' => 10));

.. code-block:: py

 def get_routes():
     return requests.get(
         "https://api.mailgun.net/v2/routes",
         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"),
         params={"skip": 1,
                 "limit": 1})

.. code-block:: rb

 def get_routes
   RestClient.get "https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
   "@api.mailgun.net/v2/routes", :params => {
     :skip => 1,
     :limit => 1
   }
 end

.. code-block:: csharp

 public static IRestResponse GetRoutes() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.Resource = "routes";
 	request.AddParameter("skip", 1);
 	request.AddParameter("limit", 1);
 	return client.Execute(request);
 }
