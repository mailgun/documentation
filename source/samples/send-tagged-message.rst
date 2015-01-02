
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v2/YOUR_DOMAIN_NAME/messages \
	-F from='Sender Bob <sbob@YOUR_DOMAIN_NAME>' \
	-F to='alice@example.com' \
	-F subject='Hello' \
	-F text='Testing some Mailgun awesomness!' \
	-F o:tag='September newsletter' \
	-F o:tag='newsletters'

.. code-block:: java

 public static ClientResponse SendTaggedMessage() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/YOUR_DOMAIN_NAME" +
 				"/messages");
 	MultivaluedMapImpl formData = new MultivaluedMapImpl();
 	formData.add("from", "Excited User <YOU@YOUR_DOMAIN_NAME>");
 	formData.add("to", "bar@example.com");
 	formData.add("subject", "Hello");
 	formData.add("text", "Testing some Mailgun awesomness!");
 	formData.add("o:tag", "September newsletter");
 	formData.add("o:tag", "newsletters");
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
      'from'    => 'Excited User <YOU@YOUR_DOMAIN_NAME>',
      'to'      => 'Baz <baz@example.com>',
      'subject' => 'Hello',
      'text'    => 'Testing some Mailgun awesomness!',
      'o:tag'   => array('Tag1', 'Tag2')
  ));

.. code-block:: py

 def send_tagged_message():
     return requests.post(
         "https://api.mailgun.net/v2/YOUR_DOMAIN_NAME/messages",
         auth=("api", "YOUR_API_KEY"),
         data={"from": "Excited User <YOU@YOUR_DOMAIN_NAME>",
               "to": "bar@example.com",
               "subject": "Hello",
               "text": "Testing some Mailgun awesomness!",
               "o:tag": ["September newsletter", "newsletters"]})

.. code-block:: rb

 def send_tagged_message
   data = Multimap.new
   data[:from] = "Excited User <YOU@YOUR_DOMAIN_NAME>"
   data[:to] = "bar@example.com"
   data[:subject] = "Hello"
   data[:text] = "Testing some Mailgun awesomness!"
   data["o:tag"] = "September newsletter"
   data["o:tag"] = "newsletters"
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v2/YOUR_DOMAIN_NAME/messages", data
 end

.. code-block:: csharp

 public static IRestResponse SendTaggedMessage() {
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
 	request.AddParameter("subject", "Hello");
 	request.AddParameter("text", "Testing some Mailgun awesomness!");
 	request.AddParameter("o:tag", "September newsletter");
 	request.AddParameter("o:tag", "newsletters");
 	request.Method = Method.POST;
 	return client.Execute(request);
 }

.. code-block:: go

 func SendTaggedMessage(domain, apiKey string) (string, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   m := mg.NewMessage(
     "Excited User <YOU@YOUR_DOMAIN_NAME>", 
     "Hello", 
     "Testing some Mailgun awesomeness!", 
     "bar@example.com",
   )
   m.AddTag("FooTag")
   m.AddTag("BarTag")
   m.AddTag("BlortTag")
   _, id, err := mg.Send(m)
   return id, err
 }
