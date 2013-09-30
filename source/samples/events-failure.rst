.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' -G \
        https://api.mailgun.net/v2/samples.mailgun.org/events \
        --data-urlencode event='rejected OR failed'

.. code-block:: java

 public static ClientResponse GetLogs() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("
        https://api.mailgun.net/v2/samples.mailgun.org/events");
 	MultivaluedMapImpl queryParams = new MultivaluedMapImpl();
 	queryParams.add("f:event", "rejected OR failed");
 	return webResource.queryParams(queryParams).get(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('key-3ax6xnjp29jd6fds4gc373sgvjxteol0');
  $domain = 'samples.mailgun.org';
  $queryString = array('event' => 'rejected OR failed');

  # Make the call to the client.
  $result = $mgClient->get("$domain/events", $queryString);

.. code-block:: py

 def get_logs():
     return requests.get(
         "https://api.mailgun.net/v2/samples.mailgun.org/events",
         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"),
         params={"f:event" : "rejected OR failed"})

.. code-block:: rb

 def get_logs
   RestClient.get "https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
   "@api.mailgun.net/v2/samples.mailgun.org/events", 
   :params => {
     :"f:event" => 'rejected OR failed'
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
 	request.Resource = "{domain}/events";
 	request.AddParameter("f:event", "rejected OR failed");
 	return client.Execute(request);
 }
