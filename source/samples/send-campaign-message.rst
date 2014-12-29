
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v2/YOUR_DOMAIN_NAME/messages \
	-F from='Excited User <YOU@YOUR_DOMAIN_NAME>' \
	-F to=baz@example.com \
	-F subject='Hello' \
	-F text='Testing some Mailgun awesomness!' \
	-F o:campaign='my_campaign_id'

.. code-block:: java

 public static ClientResponse SendCampaignMessage() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/YOUR_DOMAIN_NAME" +
 				"/messages");
 	MultivaluedMapImpl formData = new MultivaluedMapImpl();
 	formData.add("from", "Excited User <YOU@YOUR_DOMAIN_NAME>");
 	formData.add("to", "bar@example.com");
 	formData.add("to", "baz@example.com");
 	formData.add("subject", "Hello");
 	formData.add("text", "Testing some Mailgun awesomness!");
 	formData.add("o:campaign", "my_campaign_id");
 	return webResource.type(MediaType.APPLICATION_FORM_URLENCODED).
 		post(ClientResponse.class, formData);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');
  $domain = "YOUR_DOMAIN_NAME";

  # Make the call to the client.
  $result = $mgClient->sendMessage($domain, array(
      'from'       => 'Excited User <YOU@YOUR_DOMAIN_NAME>',
      'to'         => 'Baz <baz@example.com>',
      'subject'    => 'Hello',
      'text'       => 'Testing some Mailgun awesomness!',
      'o:campaign' => 'my_campaign_id'
));

.. code-block:: py

 def send_campaign_message():
     return requests.post(
         "https://api.mailgun.net/v2/YOUR_DOMAIN_NAME/messages",
         auth=("api", "YOUR_API_KEY"),
         data={"from": "Excited User <YOU@YOUR_DOMAIN_NAME>",
               "to": ["baz@example.com"],
               "subject": "Hello",
               "text": "Testing some Mailgun awesomness!",
               "o:campaign": 'my_campaign_id'})

.. code-block:: rb

 def send_campaign_message
   RestClient.post("https://api:YOUR_API_KEY" \
                   "@api.mailgun.net/v2/YOUR_DOMAIN_NAME/messages",
                   :from => "Excited User <YOU@YOUR_DOMAIN_NAME>",
                   :to => "baz@example.com",
                   :subject => "Hello",
                   :text => "Testing some Mailgun awesomness!",
                   'o:campaign' => 'my_campaign_id')
 end

.. code-block:: csharp

 public static IRestResponse SendCampaignMessage() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
 	RestRequest request = new RestRequest();
 	request.AddParameter("domain",
 	                     "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
 	request.Resource = "{domain}/messages";
 	request.AddParameter("from", "Excited User <YOU@YOUR_DOMAIN_NAME>");
 	request.AddParameter("to", "bar@example.com");
 	request.AddParameter("to", "baz@example.com");
 	request.AddParameter("subject", "Hello");
 	request.AddParameter("text", "Testing some Mailgun awesomness!");
 	request.AddParameter("o:campaign", "my_campaign_id");
 	request.Method = Method.POST;
 	return client.Execute(request);
 }

.. code-block:: go

 // Not supported
