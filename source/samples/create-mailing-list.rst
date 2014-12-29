
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v2/lists \
	-F address='dev@YOUR_DOMAIN_NAME' \
	-F description='Mailgun developers list'

.. code-block:: java

 public static ClientResponse CreateMailingList() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/lists");
 	MultivaluedMapImpl formData = new MultivaluedMapImpl();
 	formData.add("address", "dev@YOUR_DOMAIN_NAME");
 	formData.add("description", "Mailgun developers list");
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
  $result = $mgClient->post("lists", array(
      'address'     => 'dev@YOUR_DOMAIN_NAME',
      'description' => 'Mailgun Dev List'
  ));

.. code-block:: py

 def create_mailing_list():
     return requests.post(
         "https://api.mailgun.net/v2/lists",
         auth=('api', 'YOUR_API_KEY'),
         data={'address': 'dev@YOUR_DOMAIN_NAME',
               'description': "Mailgun developers list"})

.. code-block:: rb

 def create_mailing_list
   RestClient.post("https://api:YOUR_API_KEY" \
                   "@api.mailgun.net/v2/lists",
                   :address => 'dev@YOUR_DOMAIN_NAME',
                   :description => "Mailgun developers list")
 end

.. code-block:: csharp

 public static IRestResponse CreateMailingList() {

 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
 	RestRequest request = new RestRequest();
 	request.Resource = "lists";
 	request.AddParameter("address", "dev@YOUR_DOMAIN_NAME");
 	request.AddParameter("description", "Mailgun developers list");
 	request.Method = Method.POST;
 	return client.Execute(request);
 }

.. code-block:: go

  func CreateMailingList(domain, apiKey string) (mailgun.List, error) {
    mg := mailgun.NewMailgun(domain, apiKey, "")
    protoList := mailgun.List{
      Address:     "dev@YOUR_DOMAIN_NAME",
      Name:        "dev",
      Description: "Mailgun developers list.",
      AccessLevel: mailgun.Members,
    }
    return mg.CreateList(protoList)
  }
