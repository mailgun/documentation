
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages \
	-F from='Excited User <YOU@YOUR_DOMAIN_NAME>' \
	-F to='foo@example.com' \
	-F cc='bar@example.com' \
	-F bcc='baz@example.com' \
	-F subject='Hello' \
	-F text='Testing some Mailgun awesomness!' \
	--form-string html='<html>HTML version of the body</html>' \
	-F attachment=@files/cartman.jpg \
	-F attachment=@files/cartman.png

.. code-block:: java

 public static ClientResponse SendComplexMessage() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/" +
 				"messages");
 	FormDataMultiPart form = new FormDataMultiPart();
 	form.field("from", "Excited User <YOU@YOUR_DOMAIN_NAME>");
 	form.field("to", "foo@example.com");
 	form.field("bcc", "bar@example.com");
 	form.field("cc", "baz@example.com");
 	form.field("subject", "Hello");
 	form.field("text", "Testing some Mailgun awesomness!");
 	String file_separator = System.getProperty("file.separator");
 	File txtFile = new File("." + file_separator +
 			"files" + file_separator + "test.txt");
 	form.bodyPart(new FileDataBodyPart("attachment",txtFile,
 			MediaType.TEXT_PLAIN_TYPE));
 	File jpgFile = new File("." + file_separator +
 			"files" + file_separator + "test.jpg");
 	form.bodyPart(new FileDataBodyPart("attachment",jpgFile,
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
  $result = $mgClient->sendMessage($domain, array(
      'from'    => 'Excited User <YOU@YOUR_DOMAIN_NAME>',
      'to'      => 'foo@example.com',
      'cc'      => 'baz@example.com',
      'bcc'     => 'bar@example.com',
      'subject' => 'Hello',
      'text'    => 'Testing some Mailgun awesomness!',
      'html'    => '<html>HTML version of the body</html>'
  ), array(
      'attachment' => array('/path/to/file.txt', '/path/to/file.txt')
  ));

.. code-block:: py

 def send_complex_message():
     return requests.post(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages",
         auth=("api", "YOUR_API_KEY"),
         files=[("attachment", open("files/test.jpg")),
                ("attachment", open("files/test.txt"))],
         data={"from": "Excited User <YOU@YOUR_DOMAIN_NAME>",
               "to": "foo@example.com",
               "cc": "baz@example.com",
               "bcc": "bar@example.com",
               "subject": "Hello",
               "text": "Testing some Mailgun awesomness!",
               "html": "<html>HTML version of the body</html>"})

.. code-block:: rb

 def send_complex_message
   data = Multimap.new
   data[:from] = "Excited User <YOU@YOUR_DOMAIN_NAME>"
   data[:to] = "foo@example.com"
   data[:cc] = "baz@example.com"
   data[:bcc] = "bar@example.com"
   data[:subject] = "Hello"
   data[:text] = "Testing some Mailgun awesomness!"
   data[:html] = "<html>HTML version of the body</html>"
   data[:attachment] = File.new(File.join("files", "test.jpg"))
   data[:attachment] = File.new(File.join("files", "test.txt"))
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages", data
 end

.. code-block:: csharp

  using System;
  using System.IO;
  using RestSharp;
  using RestSharp.Authenticators;
  
  public class SendComplexMessageChunk
  {
  
      public static void Main (string[] args)
      {
          Console.WriteLine (SendComplexMessage ().Content.ToString ());
      }
  
      public static IRestResponse SendComplexMessage ()
      {
          RestClient client = new RestClient ();
          client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
          client.Authenticator =
              new HttpBasicAuthenticator ("api",
                                          "YOUR_API_KEY");
          RestRequest request = new RestRequest ();
          request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
          request.Resource = "{domain}/messages";
          request.AddParameter ("from", "Excited User <YOU@YOUR_DOMAIN_NAME>");
          request.AddParameter ("to", "foo@example.com");
          request.AddParameter ("cc", "baz@example.com");
          request.AddParameter ("bcc", "bar@example.com");
          request.AddParameter ("subject", "Hello");
          request.AddParameter ("text", "Testing some Mailgun awesomness!");
          request.AddParameter ("html",
                                "<html>HTML version of the body</html>");
          request.AddFile ("attachment", Path.Combine ("files", "test.jpg"));
          request.AddFile ("attachment", Path.Combine ("files", "test.txt"));
          request.Method = Method.POST;
          return client.Execute (request);
      }
  
  }

.. code-block:: go

 func SendComplexMessage(domain, apiKey string) (string, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   m := mg.NewMessage(
     "Excited User <YOU@YOUR_DOMAIN_NAME>",
     "Hello",
     "Testing some Mailgun awesomeness!",
     "foo@example.com",
   )
   m.AddCC("baz@example.com")
   m.AddBCC("bar@example.com")
   m.SetHtml("<html>HTML version of the body</html>")
   m.AddAttachment("files/test.jpg")
   m.AddAttachment("files/test.txt")
   _, id, err := mg.Send(m)
   return id, err
 }
 
