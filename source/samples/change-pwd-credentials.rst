
.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' -X PUT \
	https://api.mailgun.net/v2/samples.mailgun.org/credentials/alice \
	-F password='abc123'

.. code-block:: java

 public static ClientResponse ChangeCredentialPassword() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/samples.mailgun.org" +
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
  $mgClient = new Mailgun('key-3ax6xnjp29jd6fds4gc373sgvjxteol0');
  $domain = 'samples.mailgun.org';
  $login= 'alice';

  # Issue the call to the client.
  $result = $mgClient->put("$domain/credentials/$login", array(
      'password' => 'supersecret'
  ));

.. code-block:: py

 def change_credential_password():
     return requests.put(
         "https://api.mailgun.net/v2/samples.mailgun.org/credentials/alice",
         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"),
         data={"password": "supersecret"})

.. code-block:: rb

 def change_credential_password
   RestClient.put "https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
   "@api.mailgun.net/v2/samples.mailgun.org/credentials/alice",
   :password => "supersecret"
 end

.. code-block:: csharp

 public static IRestResponse ChangeCredentialPassword() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.AddParameter("domain",
 	                     "samples.mailgun.org", ParameterType.UrlSegment);
 	request.Resource = "{domain}/credentials/{username}";
 	request.AddUrlSegment("username", "alice");
 	request.AddParameter("password", "supersecret");
 	request.Method = Method.PUT;
 	return client.Execute(request);
 }

.. code-block:: go

 // coming soon
