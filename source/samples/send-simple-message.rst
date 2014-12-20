.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' \
        https://api.mailgun.net/v2/samples.mailgun.org/messages \
        -F from='Excited User <me@samples.mailgun.org>' \
        -F to=baz@example.com \
        -F to=bar@example.com \
        -F subject='Hello' \
        -F text='Testing some Mailgun awesomness!'

.. code-block:: java

	public static Response SendSimpleMessage() {
		Client client = ClientBuilder.newClient();
		client.register(HttpAuthenticationFeature.basic(
			"api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"
		));
		WebTarget target = client.target(
			"https://api.mailgun.net/v2/samples.mailgun.org/messages"
		);
		MultivaluedMapImpl formData = new MultivaluedMapImpl();
		formData.add("from", "Mailgun Sandbox <postmaster@samples.mailgun.org>");
		formData.add("to", "bar@example.com");
		formData.add("to", "baz@example.com");
		formData.add("subject", "Hello");
		formData.add("text", "Testing some Mailgun awesomeness!");
		return target.request(MediaType.APPLICATION_FORM_URLENCODED)
			.post(Entity.form(formData));
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
      'to'      => 'Baz <baz@example.com>',
      'subject' => 'Hello',
      'text'    => 'Testing some Mailgun awesomness!'
  ));

.. code-block:: py

 def send_simple_message():
     return requests.post(
         "https://api.mailgun.net/v2/samples.mailgun.org/messages",
         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"),
         data={"from": "Excited User <me@samples.mailgun.org>",
               "to": ["bar@example.com", "baz@example.com"],
               "subject": "Hello",
               "text": "Testing some Mailgun awesomness!"})

.. code-block:: rb

 def send_simple_message
   RestClient.post "https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
   "@api.mailgun.net/v2/samples.mailgun.org/messages",
   :from => "Excited User <me@samples.mailgun.org>",
   :to => "bar@example.com, baz@example.com",
   :subject => "Hello",
   :text => "Testing some Mailgun awesomness!"
 end

.. code-block:: csharp

 public static IRestResponse SendSimpleMessage() {
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
        request.Method = Method.POST;
        return client.Execute(request);
 }

.. code-block:: go

 func SendSimpleMessage(domain, apiKey string) (string, error) {
   mg := mailgun.NewMailgun(domain, apiKey, publicApiKey)
   m := mg.NewMessage(
     "Excited User <me@samples.mailgun.org>", 
     "Hello", 
     "Testing some Mailgun awesomeness!", 
     "bar@example.com",
   )
   _, id, err := mg.Send(m)
   return id, err
 }
