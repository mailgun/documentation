
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v3/routes/4f3bad2335335426750048c6

.. code-block:: java

 public static ClientResponse GetRoute() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v3/routes" +
 				"/4e97c1b2ba8a48567f007fb6");
 	return webResource.get(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');
  $routeId = '4e97c1b2ba8a48567f007fb6';

  # Issue the call to the client.
  $result = $mgClient->get("routes/$routeId");

.. code-block:: py

 def get_route():
     return requests.get(
         "https://api.mailgun.net/v3/routes/4e97c1b2ba8a48567f007fb6",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_route
   RestClient.
     get("https://api:YOUR_API_KEY"\
         "@api.mailgun.net/v3/routes/"\
         "4e97c1b2ba8a48567f007fb6"){|response, request, result| response }
 end

.. code-block:: csharp

 public static IRestResponse GetRoute() {
 	RestClient client = new RestClient();
 	client.BaseUrl = new Uri("https://api.mailgun.net/v2");
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
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
