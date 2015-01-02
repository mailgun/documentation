.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
        https://api.mailgun.net/v2/YOUR_DOMAIN_NAME/events \
        --data-urlencode event='rejected OR failed'

.. code-block:: java

 public static ClientResponse GetLogs() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("
        https://api.mailgun.net/v2/YOUR_DOMAIN_NAME/events");
 	MultivaluedMapImpl queryParams = new MultivaluedMapImpl();
 	queryParams.add("event", "rejected OR failed");
 	return webResource.queryParams(queryParams).get(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');
  $domain = 'YOUR_DOMAIN_NAME';
  $queryString = array('event' => 'rejected OR failed');

  # Make the call to the client.
  $result = $mgClient->get("$domain/events", $queryString);

.. code-block:: py

 def get_logs():
     return requests.get(
         "https://api.mailgun.net/v2/YOUR_DOMAIN_NAME/events",
         auth=("api", "YOUR_API_KEY"),
         params={"event" : "rejected OR failed"})

.. code-block:: rb

 def get_logs
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v2/YOUR_DOMAIN_NAME/events", 
   :params => {
     :"event" => 'rejected OR failed'
   }
 end

.. code-block:: csharp

 public static IRestResponse GetLogs() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
 	RestRequest request = new RestRequest();
 	request.AddParameter("domain",
 	                     "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
 	request.Resource = "{domain}/events";
 	request.AddParameter("event", "rejected OR failed");
 	return client.Execute(request);
 }

.. code-block:: go

 func GetLog2(domain, apiKey string) ([]mailgun.Event, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   ei := mg.NewEventIterator()
   err := ei.GetFirstPage(mailgun.GetEventsOptions{
     Filter:         map[string]string{
       "event": "rejected OR failed",
     }
   })
   if err != nil {
     return nil, err
   }
   return ei.Events(), nil
 }
