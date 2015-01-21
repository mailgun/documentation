
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
    https://api.mailgun.net/v2/domains \
    -F name='YOUR_DOMAIN_NAME' \
    -F smtp_password='supasecret'

.. code-block:: java

 public static ClientResponse CreateDomain() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/domains");
 	MultivaluedMapImpl formData = new MultivaluedMapImpl();
 	formData.add("name", "YOUR_DOMAIN_NAME");
 	formData.add("smtp_password", "supasecret");
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
  $result = $mgClient->post("domains", array(
      'name'          => 'newdomain.mailgun.org',
      'smtp_password' => 'supersecret'
  ));

.. code-block:: py

 def create_domain():
     return requests.post(
         "https://api.mailgun.net/v2/domains",
         auth=("api", "YOUR_API_KEY"),
         data={"name": "YOUR_DOMAIN_NAME",
               "smtp_password": "supasecret"})

.. code-block:: rb

 def create_domain
   data = Multimap.new
   data[:name] = "YOUR_DOMAIN_NAME"
   data[:smtp_password] = "supasecret"
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v2/domains", data
 end

.. code-block:: csharp

 public static IRestResponse CreateDomain() {
 	RestClient client = new RestClient();
 	client.BaseUrl = new Uri("https://api.mailgun.net/v2");
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
 	RestRequest request = new RestRequest();
 	request.Resource = "domains";
 	request.AddParameter("name", "supasecret");
 	request.AddParameter("smtp_password", "supasecret");
 	request.Method = Method.POST;
 	return client.Execute(request);
 }
 
.. code-block:: go

 func CreateDomain(domain, apiKey string) error {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.CreateDomain("YOUR_DOMAIN_NAME", "supersecretpw", mailgun.Tag, false)
 }
