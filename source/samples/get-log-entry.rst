
.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' -G \
	https://api.mailgun.net/v2/samples.mailgun.org/log \
	-d skip=50 \
	-d limit=1

.. code-block:: java

 public static ClientResponse GetLogs() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/samples.mailgun.org/log");
 	MultivaluedMapImpl queryParams = new MultivaluedMapImpl();
 	queryParams.add("skip", 50);
 	queryParams.add("limit", 1);
 	return webResource.queryParams(queryParams).get(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('key-3ax6xnjp29jd6fds4gc373sgvjxteol0');
  $domain = 'samples.mailgun.org';

  # Issue the call to the client.
  $result = $mgClient->get("$domain/log", 
                           array('limit' => 5, 'skip'  => 10));

.. code-block:: py

 def get_logs():
     return requests.get(
         "https://api.mailgun.net/v2/samples.mailgun.org/log",
         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"),
         params={"skip": 50,
                 "limit": 1})

.. code-block:: rb

 def get_logs
   RestClient.get "https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
   "@api.mailgun.net/v2/samples.mailgun.org/log", :params => {
     :skip => 50,
     :limit => 1
   }
 end

.. code-block:: csharp

 public static RestResponse GetLogs() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.AddParameter("domain",
 	                     "samples.mailgun.org", ParameterType.UrlSegment);
 	request.Resource = "{domain}/log";
 	request.AddParameter("skip", 50);
 	request.AddParameter("limit", 1);
 	return client.Execute(request);
 }
