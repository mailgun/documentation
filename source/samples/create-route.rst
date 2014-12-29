.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v2/routes \
	-F priority=0 \
	-F description='Sample route' \
	-F expression='match_recipient(".*@YOUR_DOMAIN_NAME")' \
	-F action='forward("http://myhost.com/messages/")' \
	-F action='stop()'

.. code-block:: java

 public static ClientResponse CreateRoute() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/routes");
 	MultivaluedMapImpl formData = new MultivaluedMapImpl();
 	formData.add("priority", 0);
 	formData.add("description", "Sample route");
 	formData.add("expression", "match_recipient('.*@YOUR_DOMAIN_NAME')");
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
  $mgClient = new Mailgun('YOUR_API_KEY');

  # Issue the call to the client.
  $result = $mgClient->post("routes", array(
      'priority'    => 0,
      'expression'  => 'match_recipient(".*@YOUR_DOMAIN_NAME")',
      'action'      => array('forward("http://host.com/messages")', 'stop()'),
      'description' => 'Sample route'
  ));

.. code-block:: py

 def create_route():
     return requests.post(
         "https://api.mailgun.net/v2/routes",
         auth=("api", "YOUR_API_KEY"),
         data={"priority": 0,
               "description": "Sample route",
               "expression": "match_recipient('.*@YOUR_DOMAIN_NAME')",
               "action": ["forward('http://myhost.com/messages/')", "stop()"]})

.. code-block:: rb

 def create_route
   data = Multimap.new
   data[:priority] = 0
   data[:description] = "Sample route"
   data[:expression] = "match_recipient('.*@YOUR_DOMAIN_NAME')"
   data[:action] = "forward('http://myhost.com/messages/')"
   data[:action] = "stop()"
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v2/routes", data
 end

.. code-block:: csharp

 public static IRestResponse CreateRoute() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
 	RestRequest request = new RestRequest();
 	request.Resource = "routes";
 	request.AddParameter("priority", 0);
 	request.AddParameter("description", "Sample route");
 	request.AddParameter("expression",
 	                     "match_recipient('.*@YOUR_DOMAIN_NAME')");
 	request.AddParameter("action",
 	                     "forward('http://myhost.com/messages/')");
 	request.AddParameter("action", "stop()");
 	request.Method = Method.POST;
 	return client.Execute(request);
 }

.. code-block:: go

 func CreateRoute(domain, apiKey string) (mailgun.Route, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.CreateRoute(mailgun.Route{
     Priority:    1,
     Description: "Sample Route",
     Expression:  "match_recipient(\".*@YOUR_DOMAIN_NAME\")",
     Actions: []string{
       "forward(\"http://example.com/messages/\")",
       "stop()",
     },
   })
 }
