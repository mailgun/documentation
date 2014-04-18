
.. code-block:: bash

 curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' \
     https://api.mailgun.net/v2/samples.mailgun.org/messages \
     -F from='Excited User <me@samples.mailgun.org>' \
     -F to=alice@example.com \
     -F to=bob@example.com \
     -F recipient-variables='{"bob@example.com": {"first":"Bob", "id":1}, "alice@example.com": {"first":"Alice", "id": 2}}' \
     -F subject='Hey, %recipient.first%' \
     -F text='If you wish to unsubscribe, click http://mailgun/unsubscribe/%recipient.id%'

.. code-block:: java

 public static ClientResponse SendTemplateMessage() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/samples.mailgun.org" +
 				"/messages");
 	MultivaluedMapImpl formData = new MultivaluedMapImpl();
 	formData.add("from", "Excited User <me@samples.mailgun.org>");
 	formData.add("to", "alice@example.com");
 	formData.add("to", "bob@example.com");
 	formData.add("subject", "Hey, %recipient.first%");
 	formData.add("text", "If you wish to unsubscribe, click http://mailgun/unsubscribe/%recipient.id%");
 	formData.add("recipient-variables", "{\"bob@example.com\": {\"first\":\"Bob\", \"id\":1}, \"alice@example.com\": {\"first\":\"Alice\", \"id\": 2}}");
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
      'from'    => 'Excited User <me@samples.mailgun.org>',
      'to'      => 'bob@example.com, alice@example.com',
      'subject' => 'Hello',
      'text'    => 'If you wish to unsubscribe,
                            click http://mailgun/unsubscribe/%recipient.id%',
              'recipient-variables' => '{"bob@example.com": {"first":"Bob", "id":1},
                                         "alice@example.com": {"first":"Alice", "id": 2}}'
  ));

.. code-block:: py

 def send_template_message():
     return requests.post(
         "https://api.mailgun.net/v2/samples.mailgun.org/messages",
         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"),
         data={"from": "Excited User <me@samples.mailgun.org>",
               "to": ["alice@example.com, bob@example.com"],
               "subject": "Hey, %recipient.first%",
               "text": "If you wish to unsubscribe, click http://mailgun/unsubscribe/%recipient.id%'",
               "recipient-variables": ('{"bob@example.com": {"first":"Bob", "id":1}, '
                                       '"alice@example.com": {"first":"Alice", "id": 2}}')})

.. code-block:: rb

 def send_template_message
   RestClient.post "https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
   "@api.mailgun.net/v2/samples.mailgun.org/messages",
   :from => "Excited User <me@samples.mailgun.org>",
   :to => "alice@example.com, bob@example.com",
   :subject => "Hey, %recipient.first%",
   :text => "If you wish to unsubscribe, click http://mailgun/unsubscribe/%recipient.id%'",
   :'recipient-variables' => '{"bob@example.com": {"first":"Bob", "id":1}, "alice@example.com": {"first":"Alice", "id": 2}}'
 end

.. code-block:: csharp

 public static IRestResponse SendTemplateMessage() {
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
 	request.AddParameter("to", "alice@example.com");
 	request.AddParameter("to", "bob@example.com");
 	request.AddParameter("subject", "Hey, %recipient.first%");
 	request.AddParameter("text", "If you wish to unsubscribe, click http://mailgun/unsubscribe/%recipient.id%'");
 	request.AddParameter("recipient-variables", "{\"bob@example.com\": {\"first\":\"Bob\", \"id\":1}, \"alice@example.com\": {\"first\":\"Alice\", \"id\": 2}}");
 	request.Method = Method.POST;
 	return client.Execute(request);
 }
