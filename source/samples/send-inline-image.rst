
.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' \
	https://api.mailgun.net/v2/samples.mailgun.org/messages \
	-F from='Excited User <me@samples.mailgun.org>' \
	-F to='alice@example.com' \
	-F subject='Hello' \
	-F text='Testing some Mailgun awesomness!' \
	--form-string html='<html>Inline image here: <img src="cid:cartman.jpg"></html>' \
	-F inline=@files/cartman.jpg

.. code-block:: java

 public static ClientResponse SendInlineImage() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/samples.mailgun.org" +
 				"/messages");
 	FormDataMultiPart form = new FormDataMultiPart();
 	form.field("from", "Excited User <me@samples.mailgun.org>");
 	form.field("to", "baz@example.com");
 	form.field("subject", "Hello");
 	form.field("text", "Testing some Mailgun awesomness!");
 	form.field("html", "<html>Inline image here: <img src=\"cid:test.jpg\"></html>");
 	File jpgFile = new File("files/test.jpg");
 	form.bodyPart(new FileDataBodyPart("inline",jpgFile,
 			MediaType.APPLICATION_OCTET_STREAM_TYPE));
 	return webResource.type(MediaType.MULTIPART_FORM_DATA_TYPE).
 		post(ClientResponse.class, form);
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
      'to'      => 'foo@example.com',
      'cc'      => 'baz@example.com',
      'bcc'     => 'bar@example.com',
      'subject' => 'Hello',
      'text'    => 'Testing some Mailgun awesomness!',
      'html'    => '<html>Inline image: <img src="cid:test.jpg"></html>'
  ), array(
      'inline' => array('@/path/to/test.jpg')
  ));

.. code-block:: py

 def send_inline_image():
     return requests.post(
         "https://api.mailgun.net/v2/samples.mailgun.org/messages",
         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"),
         files=[("inline", open("files/test.jpg"))],
         data={"from": "Excited User <me@samples.mailgun.org>",
               "to": "bar@example.com",
               "subject": "Hello",
               "text": "Testing some Mailgun awesomness!",
               "html": '<html>Inline image here: <img src="cid:test.jpg"></html>'})

.. code-block:: rb

 def send_inline_image
   data = Multimap.new
   data[:from] = "Excited User <me@samples.mailgun.org>"
   data[:to] = "bar@example.com"
   data[:subject] = "Hello"
   data[:text] = "Testing some Mailgun awesomness!"
   data[:html] = '<html>Inline image here: <img src="cid:test.jpg"></html>'
   data[:inline] = File.new(File.join("files", "test.jpg"))
   RestClient.post "https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
   "@api.mailgun.net/v2/samples.mailgun.org/messages", data
 end

.. code-block:: csharp

 public static IRestResponse SendInlineImage() {
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
 	request.AddParameter("to", "baz@example.com");
 	request.AddParameter("subject", "Hello");
 	request.AddParameter("text", "Testing some Mailgun awesomness!");
 	request.AddParameter("html", "<html>Inline image here: <img src=\"cid:test.jpg\"></html>");
 	request.AddFile("inline", "files/test.jpg");
 	request.Method = Method.POST;
 	return client.Execute(request);
 }
