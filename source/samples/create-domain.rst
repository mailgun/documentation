
.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' \
    https://api.mailgun.net/v2/domains \
    -F name='samples.mailgun.org' \
    -F smtp_password='supasecret'

.. code-block:: java

 public static ClientResponse CreateDomain() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/domains");
 	MultivaluedMapImpl formData = new MultivaluedMapImpl();
 	formData.add("name", "samples.mailgun.org");
 	formData.add("smtp_password", "supasecret");
 	return webResource.type(MediaType.APPLICATION_FORM_URLENCODED).
 		post(ClientResponse.class, formData);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('key-3ax6xnjp29jd6fds4gc373sgvjxteol0');

  # Issue the call to the client.
  $result = $mgClient->post("domains", array(
      'name'          => 'newdomain.mailgun.org',
      'smtp_password' => 'supersecret'
  ));

.. code-block:: py

 def create_domain():
     return requests.post(
         "https://api.mailgun.net/v2/domains",
         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"),
         data={"name": "samples.mailgun.org",
               "smtp_password": "supasecret"})

.. code-block:: rb

 def create_domain
   data = Multimap.new
   data[:name] = "samples.mailgun.org"
   data[:smtp_password] = "supasecret"
   RestClient.post "https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
   "@api.mailgun.net/v2/domains", data
 end

.. code-block:: csharp

 public static IRestResponse CreateDomain() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.Resource = "domains";
 	request.AddParameter("name", "supasecret");
 	request.AddParameter("smtp_password", "supasecret");
 	request.Method = Method.POST;
 	return client.Execute(request);
 }
