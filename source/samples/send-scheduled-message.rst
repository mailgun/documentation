
.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' \
	https://api.mailgun.net/v2/samples.mailgun.org/messages \
	-F from='Sender Bob <sbob@samples.mailgun.org>' \
	-F to='alice@example.com' \
	-F subject='Hello' \
	-F text='Testing some Mailgun awesomness!' \
	-F o:deliverytime='Fri, 14 Oct 2011 23:10:10 -0000'

.. code-block:: java

 public static ClientResponse SendScheduledMessage() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/samples.mailgun.org" +
 				"/messages");
 	MultivaluedMapImpl formData = new MultivaluedMapImpl();
 	formData.add("from", "Excited User <me@samples.mailgun.org>");
 	formData.add("to", "bar@example.com");
 	formData.add("subject", "Hello");
 	formData.add("text", "Testing some Mailgun awesomness!");
 	formData.add("o:deliverytime", "Fri, 14 Oct 2011 23:10:10 -0000");
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
  $result = $mgClient->sendMessage($domain, array(
      'from'           => 'Excited User <me@samples.mailgun.org>',
      'to'             => 'Baz <baz@example.com>',
      'subject'        => 'Hello',
      'text'           => 'Testing some Mailgun awesomness!',
      'o:deliverytime' => 'Fri, 25 Oct 2013 23:10:10 -0000'
  ));

.. code-block:: py

 def send_scheduled_message():
     return requests.post(
         "https://api.mailgun.net/v2/samples.mailgun.org/messages",
         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"),
         data={"from": "Excited User <me@samples.mailgun.org>",
               "to": "bar@example.com",
               "subject": "Hello",
               "text": "Testing some Mailgun awesomness!",
               "o:deliverytime": "Fri, 25 Oct 2011 23:10:10 -0000"})

.. code-block:: rb

 def send_scheduled_message
   RestClient.post "https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
   "@api.mailgun.net/v2/samples.mailgun.org/messages",
   :from => "Excited User <me@samples.mailgun.org>",
   :to => "bar@example.com",
   :subject => "Hello",
   :text => "Testing some Mailgun awesomeness!",
   "o:deliverytime" => "Fri, 25 Oct 2011 23:10:10 -0000"
 end

.. code-block:: csharp

 public static IRestResponse SendScheduledMessage() {
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
 	request.AddParameter("subject", "Hello");
 	request.AddParameter("text", "Testing some Mailgun awesomness!");
 	request.AddParameter("o:deliverytime", "Fri, 14 Oct 2011 23:10:10 -0000");
 	request.Method = Method.POST;
 	return client.Execute(request);
 }

.. code-block:: go

 func SendScheduledMessage(domain, apiKey string) (string, error) {
   mg := mailgun.NewMailgun(domain, apiKey, publicApiKey)
   m := mg.NewMessage(
     "Excited User <me@samples.mailgun.org>", 
     "Hello", 
     "Testing some Mailgun awesomeness!", 
     "bar@example.com",
   )
   m.SetDeliveryTime(time.Now().Add(5 * time.Minute))
   _, id, err := mg.Send(m)
   return id, err
 }
