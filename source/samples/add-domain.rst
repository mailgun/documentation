.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	-X POST \
	https://api.mailgun.net/v3/domains \
	-F name='YOUR_NEW_DOMAIN_NAME' \
	-F smtp_password='supersecretpassword'

.. code-block:: java

 public static ClientResponse AddDomain() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v3/domains");
 	MultivaluedMapImpl formData = new MultivaluedMapImpl();
 	formData.add("name", "YOUR_NEW_DOMAIN_NAME");
 	formData.add("smtp_password", "supersecretpassword");
 	return webResource.type(MediaType.APPLICATION_FORM_URLENCODED).
 		post(ClientResponse.class, formData);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');
  $domain = 'YOUR_NEW_DOMAIN_NAME';

  # Issue the call to the client.
  $result = $mgClient->post("domains", array(
      'name'          => 'anothersample.mailgun.org',
      'smtp_password' => 'supersecretpassword'
  ));

.. code-block:: py

 def add_domain():
     return requests.post(
         "https://api.mailgun.net/v3/domains",
         auth=("api", "YOUR_API_KEY"),
         data={'name':'YOUR_NEW_DOMAIN_NAME', 'smtp_password':'supersecretpassword'})

.. code-block:: rb

 def add_domain
   RestClient.post("https://api:YOUR_API_KEY"\
                   "@api.mailgun.net/v3/domains",
                   :name => 'YOUR_NEW_DOMAIN_NAME',
                   :smtp_password => 'supersecretpassword')
 end

.. code-block:: csharp

 public static IRestResponse AddDomain() {
 	RestClient client = new RestClient();
 	client.BaseUrl = new Uri("https://api.mailgun.net/v3/");
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
 	RestRequest request = new RestRequest();
 	request.Resource = "domains";
 	request.AddParameter("name", "YOUR_NEW_DOMAIN_NAME");
 	request.AddParameter("smtp_password", "supersecretpassword");
 	request.Method = Method.POST;
 	return client.Execute(request);
 }

.. code-block:: go

 func AddDomain(domain, apiKey string) error {
        mg := mailgun.NewMailgun(domain, apiKey, "")
        return mg.CreateDomain("YOUR_NEW_DOMAIN_NAME", "supersecretpassword", mailgun.Tag, false)
 }
