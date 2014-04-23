
.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' \
	https://api.mailgun.net/v2/domains/samples.mailgun.org/credentials \
	-F login='alice@samples.mailgun.org' \
	-F password='supasecret'

.. code-block:: java

 public static ClientResponse CreateCredentials() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/domains/samples.mailgun.org" +
 				"/credentials");
 	MultivaluedMapImpl formData = new MultivaluedMapImpl();
 	formData.add("login", "alice@samples.mailgun.org");
 	formData.add("password", "secret");
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
  $result = $mgClient->post("domains/$domain/credentials", 
                      array('login'  => 'alice@samples.mailgun.org',
                            'password' => 'secret'));

.. code-block:: py

 def create_credentials():
     return requests.post(
         "https://api.mailgun.net/v2/domains/samples.mailgun.org/credentials",
         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"),
         data={"login": "alice@samples.mailgun.org",
               "password": "secret"})

.. code-block:: rb

 def create_credentials
   RestClient.post "https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
   "@api.mailgun.net/v2/domains/samples.mailgun.org/credentials",
   :login => "alice@samples.mailgun.org",
   :password => "secret"
 end

.. code-block:: csharp

 public static IRestResponse CreateCredentials() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.AddParameter("domain",
 	                     "samples.mailgun.org", ParameterType.UrlSegment);
 	request.Resource = "domains/{domain}/credentials";
 	request.AddParameter("login", "alice@samples.mailgun.org");
 	request.AddParameter("password", "secret");
 	request.Method = Method.POST;
 	return client.Execute(request);
 }
