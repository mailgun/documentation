
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -X PUT \
	https://api.mailgun.net/v2/YOUR_DOMAIN_NAME/credentials/alice \
	-F password='abc123'

.. code-block:: java

 public static ClientResponse ChangeCredentialPassword() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/YOUR_DOMAIN_NAME" +
 				"/credentials/alice");
 	MultivaluedMapImpl formData = new MultivaluedMapImpl();
 	formData.add("password", "supersecret");
 	return webResource.type(MediaType.APPLICATION_FORM_URLENCODED).
 		put(ClientResponse.class, formData);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');
  $domain = 'YOUR_DOMAIN_NAME';
  $login= 'alice';

  # Issue the call to the client.
  $result = $mgClient->put("$domain/credentials/$login", array(
      'password' => 'supersecret'
  ));

.. code-block:: py

 def change_credential_password():
     return requests.put(
         "https://api.mailgun.net/v2/YOUR_DOMAIN_NAME/credentials/alice",
         auth=("api", "YOUR_API_KEY"),
         data={"password": "supersecret"})

.. code-block:: rb

 def change_credential_password
   RestClient.put "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v2/YOUR_DOMAIN_NAME/credentials/alice",
   :password => "supersecret"
 end

.. code-block:: csharp

 public static IRestResponse ChangeCredentialPassword() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
 	RestRequest request = new RestRequest();
 	request.AddParameter("domain",
 	                     "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
 	request.Resource = "{domain}/credentials/{username}";
 	request.AddUrlSegment("username", "alice");
 	request.AddParameter("password", "supersecret");
 	request.Method = Method.PUT;
 	return client.Execute(request);
 }

.. code-block:: go

 // coming soon
