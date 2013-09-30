
.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' \
	https://api.mailgun.net/v2/samples.mailgun.org/messages.mime \
	-F to='bob@example.com' \
	-F message=@files/message.mime

.. code-block:: java

 public static ClientResponse SendMimeMessage() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/samples.mailgun.org" +
 				"/messages.mime");
 	FormDataMultiPart form = new FormDataMultiPart();
 	form.field("to", "bar@example.com");
 	String file_separator = System.getProperty("file.separator");
 	File mimeFile = new File("." + file_separator + "files" +
 			file_separator + "message.mime");
 	form.bodyPart(new FileDataBodyPart("message", mimeFile,
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
  $result = $mgClient->sendMessage("$domain",
                    array('from' => 'Excited User <me@samples.mailgun.org>',
                          'to'   => 'foo@example.com'),
                    '<Pass fully formed MIME string here>');

.. code-block:: py

 def send_mime_message():
     return requests.post(
         "https://api.mailgun.net/v2/samples.mailgun.org/messages.mime",
         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"),
         data={"to": "bar@example.com"},
         files={"message": open("files/message.mime")})

.. code-block:: rb

 def send_mime_message
   RestClient.post "https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
   "@api.mailgun.net/v2/samples.mailgun.org/messages.mime",
   :to => "bar@example.com",
   :message => File.new(File.join("files", "message.mime"))
 end

.. code-block:: csharp

 public static RestResponse SendMimeMessage() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.AddParameter("domain",
 	                     "samples.mailgun.org", ParameterType.UrlSegment);
 	request.Resource = "{domain}/messages.mime";
 	request.AddParameter("to", "bar@example.com");
 	request.AddFile("message", Path.Combine("files", "message.mime"));
 	request.Method = Method.POST;
 	return client.Execute(request);
 }
