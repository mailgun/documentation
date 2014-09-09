
.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' \
	https://api.mailgun.net/v2/lists \
	-F address='dev@samples.mailgun.org' \
	-F description='Mailgun developers list'

.. code-block:: java

 public static ClientResponse CreateMailingList() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/lists");
 	MultivaluedMapImpl formData = new MultivaluedMapImpl();
 	formData.add("address", "dev@samples.mailgun.org");
 	formData.add("description", "Mailgun developers list");
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
  $result = $mgClient->post("lists", array(
      'address'     => 'dev@samples.mailgun.org',
      'description' => 'Mailgun Dev List'
  ));

.. code-block:: py

 def create_mailing_list():
     return requests.post(
         "https://api.mailgun.net/v2/lists",
         auth=('api', 'key-3ax6xnjp29jd6fds4gc373sgvjxteol0'),
         data={'address': 'dev@samples.mailgun.org',
               'description': "Mailgun developers list"})

.. code-block:: rb

 def create_mailing_list
   RestClient.post("https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0" \
                   "@api.mailgun.net/v2/lists",
                   :address => 'dev@samples.mailgun.org',
                   :description => "Mailgun developers list")
 end

.. code-block:: csharp

 public static IRestResponse CreateMailingList() {

 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.Resource = "lists";
 	request.AddParameter("address", "dev@samples.mailgun.org");
 	request.AddParameter("description", "Mailgun developers list");
 	request.Method = Method.POST;
 	return client.Execute(request);
 }

.. code-block:: go

func CreateMailingList(domain, apiKey string) (mailgun.List, error) {
  mg := mailgun.NewMailgun(domain, apiKey, "")
  protoList := mailgun.List{
    Address:     "dev@samples.mailgun.org",
    Name:        "dev",
    Description: "Mailgun developers list.",
    AccessLevel: mailgun.Members,
  }
  return mg.CreateList(protoList)
}
