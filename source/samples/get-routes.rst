
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
	https://api.mailgun.net/v3/routes \
	-d skip=1 \
	-d limit=1

.. code-block:: java

 public static ClientResponse GetRoutes() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v3/routes");
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
  $mgClient = new Mailgun('YOUR_API_KEY');

  # Issue the call to the client.
  $result = $mgClient->get("routes", array('skip' => 5, 'limit' => 10));

.. code-block:: py

 def get_routes():
     return requests.get(
         "https://api.mailgun.net/v3/routes",
         auth=("api", "YOUR_API_KEY"),
         params={"skip": 1,
                 "limit": 1})

.. code-block:: rb

 def get_routes
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/routes", :params => {
     :skip => 1,
     :limit => 1
   }
 end

.. code-block:: csharp

 public static IRestResponse GetRoutes() {
 	RestClient client = new RestClient();
 	client.BaseUrl = new Uri("https://api.mailgun.net/v2");
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
 	RestRequest request = new RestRequest();
 	request.Resource = "routes";
 	request.AddParameter("skip", 1);
 	request.AddParameter("limit", 1);
 	return client.Execute(request);
 }

.. code-block:: go

 func GetRoutes(domain, apiKey string) (int, []mailgun.Route, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.GetRoutes(-1, -1)
 }
