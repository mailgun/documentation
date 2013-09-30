
.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' \
	https://api.mailgun.net/v2/samples.mailgun.org/mailboxes \
	-F mailbox='alice@samples.mailgun.org' \
	-F password='supasecret'

.. code-block:: java

 public static ClientResponse CreateMailbox() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/samples.mailgun.org" +
 				"/mailboxes");
 	MultivaluedMapImpl formData = new MultivaluedMapImpl();
 	formData.add("mailbox", "alice@samples.mailgun.org");
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
  $result = $mgClient->post("$domain/mailboxes", 
                      array('mailbox'  => 'alice@samples.mailgun.org',
                            'password' => 'secret'));

.. code-block:: py

 def create_mailbox():
     return requests.post(
         "https://api.mailgun.net/v2/samples.mailgun.org/mailboxes",
         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"),
         data={"mailbox": "alice@samples.mailgun.org",
               "password": "secret"})

.. code-block:: rb

 def create_mailbox
   RestClient.post "https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
   "@api.mailgun.net/v2/samples.mailgun.org/mailboxes",
   :mailbox => "alice@samples.mailgun.org",
   :password => "secret"
 end

.. code-block:: csharp

 public static RestResponse CreateMailbox() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.AddParameter("domain",
 	                     "samples.mailgun.org", ParameterType.UrlSegment);
 	request.Resource = "{domain}/mailboxes";
 	request.AddParameter("mailbox", "alice@samples.mailgun.org");
 	request.AddParameter("password", "secret");
 	request.Method = Method.POST;
 	return client.Execute(request);
 }
