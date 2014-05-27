.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' -G \
	https://api.mailgun.net/v2/samples.mailgun.org/stats \
	-d event='sent' \
	-d event='opened' \
	-d skip=1 \
	-d limit=2

.. code-block:: java

 public static ClientResponse GetStats() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/samples.mailgun.org" +
 				"/stats");
 	MultivaluedMapImpl queryParams = new MultivaluedMapImpl();
 	queryParams.add("event", "sent");
 	queryParams.add("event", "opened");
 	queryParams.add("skip", 1);
 	queryParams.add("limit", 2);
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
  $result = $mgClient->get("$domain/stats", array(
      'event' => array('sent', 'opened')
  ));

.. code-block:: py

 def get_stats():
     return requests.get(
         "https://api.mailgun.net/v2/samples.mailgun.org/stats",
         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"),
         params={"event": ["sent", "opened"],
                 "skip": 1,
                 "limit": 2})

.. code-block:: rb

 def get_stats
   url_params = Multimap.new
   url_params[:skip] = 1
   url_params[:limit] = 2
   url_params[:event] = "sent"
   url_params[:event] = "opened"
   query_string = url_params.collect {|k, v| "#{k.to_s}=#{CGI::escape(v.to_s)}"}.
     join("&")
   RestClient.get "https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
   "@api.mailgun.net/v2/samples.mailgun.org/stats?#{query_string}"
 end

.. code-block:: csharp

 public static IRestResponse GetStats() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.AddParameter("domain",
 	                     "samples.mailgun.org", ParameterType.UrlSegment);
 	request.Resource = "{domain}/stats";
 	request.AddParameter("event", "sent");
 	request.AddParameter("event", "opened");
 	request.AddParameter("skip", 1);
 	request.AddParameter("limit", 2);
 	return client.Execute(request);
 }
