
.. code-block:: bash

    curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' -G \
	https://api.mailgun.net/v2/samples.mailgun.org/complaints/baz@example.com

.. code-block:: java

 public static ClientResponse GetComplaint() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v2/samples.mailgun.org/" +
 				"complaints/baz@example.com");
 	return webResource.get(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('key-3ax6xnjp29jd6fds4gc373sgvjxteol0');
  $domain = 'samples.mailgun.org';
  $complaint = 'user@example.com';

  # Issue the call to the client.
  $result = $mgClient->get("$domain/complaints/$complaint");

.. code-block:: py

 def get_complaint():
     return requests.get(
         "https://api.mailgun.net/v2/samples.mailgun.org/complaints/baz@example.com",
         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"))

.. code-block:: rb

 def get_complaint
   RestClient.get("https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
                  "@api.mailgun.net/v2/samples.mailgun.org/complaints/"\
                  "baz@example.com"){|response, request, result| response }
 end

.. code-block:: csharp

 public static IRestResponse GetComplaint() {
 	RestClient client = new RestClient();
 	client.BaseUrl = "https://api.mailgun.net/v2";
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
 	RestRequest request = new RestRequest();
 	request.AddParameter("domain",
 	                     "samples.mailgun.org", ParameterType.UrlSegment);
 	request.Resource = "{domain}/complaints/baz@example.com";
 	return client.Execute(request);
 }

.. code-block:: go

 func GetComplaints(domain, apiKey string) (mailgun.Complaint, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.GetSingleComplaint("baz@example.com")
 }
