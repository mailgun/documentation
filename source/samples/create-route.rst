.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' \
	https://api.mailgun.net/v2/routes \
	-F priority=0 \
	-F description='Sample route' \
	-F expression='match_recipient(".*@samples.mailgun.org")' \
	-F action='forward("http://myhost.com/messages/")' \
	-F action='stop()'

.. code-block:: java

 public static ClientResponse CreateRoute() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/routes");
 	MultivaluedMapImpl formData = new MultivaluedMapImpl();
 	formData.add("priority", 0);
 	formData.add("description", "Sample route");
 	formData.add("expression", "match_recipient('.*@samples.mailgun.org')");
 	formData.add("action", "forward('http://myhost.com/messages/')");
 	formData.add("action", "stop()");
 	return webResource.type(MediaType.APPLICATION_FORM_URLENCODED).
 		post(ClientResponse.class, formData);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('key-3ax6xnjp29jd6fds4gc373sgvjxteol0');
  $domain = 'samples.mailgun.org';

  # Issue the call to the client.
  $result = $mgClient->post("routes",
             array('priority'    => 0,
                   'expression'  => 'match_recipient(".*@samples.mailgun.org")',
                   'action'      => array('forward("http://host.com/messages")',
                                          'stop()'),
                   'description' => 'Sample route'));

.. code-block:: py

 def create_route():
     return requests.post(
         "https://api.mailgun.net/v2/routes",
         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"),
         data={"priority": 0,
               "description": "Sample route",
               "expression": "match_recipient('.*@samples.mailgun.org')",
               "action": ["forward('http://myhost.com/messages/')", "stop()"]})

.. code-block:: rb

 def create_route
   data = Multimap.new
   data[:priority] = 0
   data[:description] = "Sample route"
   data[:expression] = "match_recipient('.*@samples.mailgun.org')"
   data[:action] = "forward('http://myhost.com/messages/')"
   data[:action] = "stop()"
   RestClient.post "https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
   "@api.mailgun.net/v2/routes", data
 end

.. code-block:: csharp

 public static IRestResponse CreateRoute() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.Resource = "routes";
 	request.AddParameter("priority", 0);
 	request.AddParameter("description", "Sample route");
 	request.AddParameter("expression",
 	                     "match_recipient('.*@samples.mailgun.org')");
 	request.AddParameter("action",
 	                     "forward('http://myhost.com/messages/')");
 	request.AddParameter("action", "stop()");
 	request.Method = Method.POST;
 	return client.Execute(request);
 }
