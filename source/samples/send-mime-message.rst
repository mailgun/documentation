
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v2/YOUR_DOMAIN_NAME/messages.mime \
	-F to='bob@example.com' \
	-F message=@files/message.mime

.. code-block:: java

 public static ClientResponse SendMimeMessage() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/YOUR_DOMAIN_NAME" +
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
  $mgClient = new Mailgun('YOUR_API_KEY');
  $domain = "YOUR_DOMAIN_NAME";

  # Make the call to the client.
  $result = $mgClient->sendMessage(
      $domain, array(
          'from' => 'Excited User <YOU@YOUR_DOMAIN_NAME>',
          'to'   => 'foo@example.com'
      ),
      '<Pass fully formed MIME string here>'
  );

.. code-block:: py

 def send_mime_message():
     return requests.post(
         "https://api.mailgun.net/v2/YOUR_DOMAIN_NAME/messages.mime",
         auth=("api", "YOUR_API_KEY"),
         data={"to": "bar@example.com"},
         files={"message": open("files/message.mime")})

.. code-block:: rb

 def send_mime_message
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v2/YOUR_DOMAIN_NAME/messages.mime",
   :to => "bar@example.com",
   :message => File.new(File.join("files", "message.mime"))
 end

.. code-block:: csharp

 public static IRestResponse SendMimeMessage() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
 	RestRequest request = new RestRequest();
 	request.AddParameter("domain",
 	                     "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
 	request.Resource = "{domain}/messages.mime";
 	request.AddParameter("to", "bar@example.com");
 	request.AddFile("message", Path.Combine("files", "message.mime"));
 	request.Method = Method.POST;
 	return client.Execute(request);
 }

.. code-block:: go

 func SendMimeMessage(domain, apiKey string) (string, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   mimeMsgReader, err := os.Open("files/message.mime")
   if err != nil {
     return "", err
   }
   m := mg.NewMIMEMessage(mimeMsgReader, "bar@example.com")
   _, id, err := mg.Send(m)
   return id, err
 }
