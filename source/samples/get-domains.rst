
.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' -G \
	https://api.mailgun.net/v2/domains \
	-d skip=0 \
	-d limit=3

.. code-block:: java

 public static ClientResponse GetDomains() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/domains");
 	MultivaluedMapImpl queryParams = new MultivaluedMapImpl();
 	queryParams.add("skip", 0);
 	queryParams.add("limit", 3);
 	return webResource.queryParams(queryParams).get(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('key-3ax6xnjp29jd6fds4gc373sgvjxteol0');

  # Issue the call to the client.
  $result = $mgClient->get("domains", array('limit' => 5, 'skip' => 10));

.. code-block:: py

 def get_domains():
     return requests.get(
         "https://api.mailgun.net/v2/domains",
         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"),
         params={"skip": 0,
                 "limit": 3})

.. code-block:: rb

 def get_domains
   RestClient.get "https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
   "@api.mailgun.net/v2/domains", :params => {
     :skip => 0,
     :limit => 3
   }
 end

.. code-block:: csharp

 public static IRestResponse GetDomains() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.Resource = "domains";
 	request.AddParameter("skip", 0);
 	request.AddParameter("limit", 3);
 	return client.Execute(request);
 }

.. code-block:: go

 func GetDomains(domain, apiKey string) (int, []mailgun.Domain, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.GetDomains(-1, -1)
 }
