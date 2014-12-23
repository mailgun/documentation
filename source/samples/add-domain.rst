.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' \
	-X POST \
	https://api.mailgun.net/v2/domains \
	-F name='samples.mailgun.org' \
	-F smtp_password='supersecretpassword'

.. code-block:: java

 public static ClientResponse AddDomain() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/domains");
 	MultivaluedMapImpl formData = new MultivaluedMapImpl();
 	formData.add("name", "samples.mailgun.org");
 	formData.add("smtp_password", "supersecretpassword");
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
  $result = $mgClient->post("domains", array(
      'name'          => 'anothersample.mailgun.org',
      'smtp_password' => 'supersecretpassword'
  ));

.. code-block:: py

 def add_domain():
     return requests.post(
         "https://api.mailgun.net/v2/domains",
         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"),
         data={'name':'samples.mailgun.org', 'smtp_password':'supersecretpassword'})

.. code-block:: rb

 def add_domain
   RestClient.post("https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
                   "@api.mailgun.net/v2/domains",
                   :name => 'samples.mailgun.org',
                   :smtp_password => 'supersecretpassword')
 end

.. code-block:: csharp

 public static IRestResponse AddDomain() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2/";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.Resource = "domains";
 	request.AddParameter("name", "samples.mailgun.org");
 	request.AddParameter("smtp_password", "supersecretpassword");
 	request.Method = Method.POST;
 	return client.Execute(request);
 }

.. code-block:: go

 func AddDomain(domain, apiKey string) error {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.CreateDomain("samples.mailgun.org", "supersecretpassword", mailgun.Tag, false)
 }
