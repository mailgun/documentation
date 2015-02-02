.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' -G \
        https://api.mailgun.net/v2/samples.mailgun.org/events \
        --data-urlencode event='failed' \
        --data-urlencode severity='temporary'

.. code-block:: java

 public static ClientResponse GetLogs() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("
        https://api.mailgun.net/v2/samples.mailgun.org/events");
 	MultivaluedMapImpl queryParams = new MultivaluedMapImpl();
 	queryParams.add("event", "failed");
  queryParams.add("severity", "temporary");
 	return webResource.queryParams(queryParams).get(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  function getDropped()
      {
        $mgClient = new Mailgun('key-30xkaxg31vbhndsy22osaitf834uszm3');
        $domain = 'nschafer.com';
        $queryString = array(
        'event' => 'failed',
        'severity'=>'temporary'
        );

        # Make the call to the client.
        $result = $mgClient->get("$domain/events", $queryString);
        var_dump($result);
      }
  

.. code-block:: py

 def get_logs():
     return requests.get(
         "https://api.mailgun.net/v2/samples.mailgun.org/events",
         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"),
         params={"event" : "failed",
                 "severity" : "temporary"})

.. code-block:: rb

 def get_logs
   RestClient.get "https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
   "@api.mailgun.net/v2/samples.mailgun.org/events", 
   :params => {
     :"event" => 'failed',
     :"severity"=>'temporary'
   }
 end

.. code-block:: csharp

 public static IRestResponse GetLogs() {
 	 RestClient client = new RestClient();
 	 client.BaseUrl = "https://api.mailgun.net/v2";
 	 client.Authenticator =
 		   new HttpBasicAuthenticator("api",
 		       "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	 RestRequest request = new RestRequest();
 	 request.AddParameter("domain",
 	     "samples.mailgun.org", ParameterType.UrlSegment);
 	 request.Resource = "{domain}/events";
 	 request.AddParameter("event", "failed");
   request.AddParameter("severity", "temporary");
 	 return client.Execute(request);
 }
