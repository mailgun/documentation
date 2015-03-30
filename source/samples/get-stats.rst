.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
	https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/stats \
	-d event='sent' \
	-d event='opened' \
	-d skip=1 \
	-d limit=2

.. code-block:: java

 public static ClientResponse GetStats() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v3/YOUR_DOMAIN_NAME" +
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
  $mgClient = new Mailgun('YOUR_API_KEY');
  $domain = 'YOUR_DOMAIN_NAME';

  # Issue the call to the client.
  $result = $mgClient->get("$domain/stats", array(
      'event' => array('sent', 'opened')
  ));

.. code-block:: py

 def get_stats():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/stats",
         auth=("api", "YOUR_API_KEY"),
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
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/stats?#{query_string}"
 end

.. code-block:: csharp

 public static IRestResponse GetStats() {
 	RestClient client = new RestClient();
 	client.BaseUrl = new Uri("https://api.mailgun.net/v2");
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
 	RestRequest request = new RestRequest();
 	request.AddParameter("domain",
 	                     "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
 	request.Resource = "{domain}/stats";
 	request.AddParameter("event", "sent");
 	request.AddParameter("event", "opened");
 	request.AddParameter("skip", 1);
 	request.AddParameter("limit", 2);
 	return client.Execute(request);
 }

.. code-block:: go

 func GetStats(domain, apiKey string) (int, []mailgun.Stat, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.GetStats(-1, -1, nil, "sent", "opened")
 }
