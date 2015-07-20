
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
	https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/complaints/baz@example.com

.. code-block:: java

 public static ClientResponse GetComplaint() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/" +
 				"complaints/baz@example.com");
 	return webResource.get(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');
  $domain = 'YOUR_DOMAIN_NAME';
  $complaint = 'user@example.com';

  # Issue the call to the client.
  $result = $mgClient->get("$domain/complaints/$complaint");

.. code-block:: py

 def get_complaint():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/complaints/baz@example.com",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_complaint
   RestClient.get("https://api:YOUR_API_KEY"\
                  "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/complaints/"\
                  "baz@example.com"){|response, request, result| response }
 end

.. code-block:: csharp

 public static IRestResponse GetComplaint() {
 	RestClient client = new RestClient();
 	client.BaseUrl = new Uri("https://api.mailgun.net/v3");
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
 	RestRequest request = new RestRequest();
 	request.AddParameter("domain",
 	                     "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
 	request.Resource = "{domain}/complaints/baz@example.com";
 	return client.Execute(request);
 }

.. code-block:: go

 func GetComplaints(domain, apiKey string) (mailgun.Complaint, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.GetSingleComplaint("baz@example.com")
 }
