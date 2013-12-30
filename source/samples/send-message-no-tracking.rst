
.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' \
	https://api.mailgun.net/v2/samples.mailgun.org/messages \
	-F from='Sender Bob <sbob@samples.mailgun.org>' \
	-F to='alice@example.com' \
	-F subject='Hello' \
	-F text='Testing some Mailgun awesomness!' \
	-F o:tracking=False

.. code-block:: java

 public static ClientResponse SendMessageNoTracking() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/samples.mailgun.org" +
 				"/messages");
 	MultivaluedMapImpl formData = new MultivaluedMapImpl();
 	formData.add("from", "Excited User <me@samples.mailgun.org>");
 	formData.add("to", "bar@example.com");
 	formData.add("to", "baz@example.com");
 	formData.add("subject", "Hello");
 	formData.add("text", "Testing some Mailgun awesomness!");
 	formData.add("o:tracking", false);
 	return webResource.type(MediaType.APPLICATION_FORM_URLENCODED).
 		post(ClientResponse.class, formData);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('key-3ax6xnjp29jd6fds4gc373sgvjxteol0');
  $domain = "samples.mailgun.org";

  # Make the call to the client.
  $result = $mgClient->sendMessage("$domain",
                  array('from'       => 'Excited User <me@samples.mailgun.org>',
                        'to'         => 'foo@example.com',
                        'subject'    => 'Hello',
                        'text'       => 'Testing some Mailgun awesomness!',
                        'o:tracking' => false));

.. code-block:: py

 def send_message_no_tracking():
     return requests.post(
         "https://api.mailgun.net/v2/samples.mailgun.org/messages",
         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"),
         data={"from": "Excited User <me@samples.mailgun.org>",
               "to": ["bar@example.com", "baz@example.com"],
               "subject": "Hello",
               "text": "Testing some Mailgun awesomness!",
               "o:tracking": False})

.. code-block:: rb

 def send_message_no_tracking
   RestClient.post "https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
   "@api.mailgun.net/v2/samples.mailgun.org/messages",
   :from => "Excited User <me@samples.mailgun.org>",
   :to => "bar@example.com, baz@example.com",
   :subject => "Hello",
   :text => "Testing some Mailgun awesomness!",
   "o:tracking" => false
 end

.. code-block:: csharp

 public static IRestResponse SendMessageNoTracking() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.AddParameter("domain",
 	                     "samples.mailgun.org", ParameterType.UrlSegment);
 	request.Resource = "{domain}/messages";
 	request.AddParameter("from", "Excited User <me@samples.mailgun.org>");
 	request.AddParameter("to", "bar@example.com");
 	request.AddParameter("to", "baz@example.com");
 	request.AddParameter("subject", "Hello");
 	request.AddParameter("text", "Testing some Mailgun awesomness!");
 	request.AddParameter("o:tracking", false);
 	request.Method = Method.POST;
 	return client.Execute(request);
 }
