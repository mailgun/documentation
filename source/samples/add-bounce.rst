
.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' \
	https://api.mailgun.net/v2/samples.mailgun.org/bounces \
	-F address='bob@example.com'

.. code-block:: java

 public static ClientResponse AddBounce() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/samples.mailgun.org/" +
 				"bounces");
 	MultivaluedMapImpl formData = new MultivaluedMapImpl();
 	formData.add("address", "bob@example.com");
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
  $result = $mgClient->post("$domain/bounces", array('address' => 'bob@example.com'));

.. code-block:: py

 def add_bounce():
     return requests.post(
         "https://api.mailgun.net/v2/samples.mailgun.org/bounces",
         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"),
         data={'address':'bob@example.com'})

.. code-block:: rb

 def add_bounce
   RestClient.post("https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
                   "@api.mailgun.net/v2/samples.mailgun.org/bounces",
                   :address => 'bob@example.com')
 end

.. code-block:: csharp

 public static RestResponse AddBounce() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.Resource = "{domain}/bounces";
 	request.AddParameter("domain",
 	                     "samples.mailgun.org", ParameterType.UrlSegment);
 	request.AddParameter("address", "bob@example.com");
 	request.Method = Method.POST;
 	return client.Execute(request);
 }
