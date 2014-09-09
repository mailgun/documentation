
.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' \
	https://api.mailgun.net/v2/routes/4f3bad2335335426750048c6

.. code-block:: java

 public static ClientResponse GetRoute() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/routes" +
 				"/4e97c1b2ba8a48567f007fb6");
 	return webResource.get(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('key-3ax6xnjp29jd6fds4gc373sgvjxteol0');
  $routeId = '4e97c1b2ba8a48567f007fb6';

  # Issue the call to the client.
  $result = $mgClient->get("routes/$routeId");

.. code-block:: py

 def get_route():
     return requests.get(
         "https://api.mailgun.net/v2/routes/4e97c1b2ba8a48567f007fb6",
         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"))

.. code-block:: rb

 def get_route
   RestClient.
     get("https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
         "@api.mailgun.net/v2/routes/"\
         "4e97c1b2ba8a48567f007fb6"){|response, request, result| response }
 end

.. code-block:: csharp

 public static IRestResponse GetRoute() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.Resource = "routes/{id}";
 	request.AddUrlSegment("id", "4e97c1b2ba8a48567f007fb6");
 	return client.Execute(request);
 }

.. code-block:: go

 func GetRouteByID(domain, apiKey string) (Route, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.GetRouteByID("4e97c1b2ba8a48567f007fb6")
 }
