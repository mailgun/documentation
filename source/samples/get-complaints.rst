
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -G \
	https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/complaints

.. code-block:: java

 public static ClientResponse GetComplaints() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/" +
 				"complaints");
 	return webResource.get(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');
  $domain = 'YOUR_DOMAIN_NAME';

  # Issue the call to the client.
  $result = $mgClient->get("$domain/complaints", array(
      'limit' => 10,
      'skip'  => 5
  ));

.. code-block:: py

 def get_complaints():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/complaints",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_complaints
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/complaints"
 end

.. code-block:: csharp

using System;
using System.IO;
using RestSharp;
using RestSharp.Authenticators;

public class GetComplaintsChunk
{

    public static void Main (string[] args)
    {
        Console.WriteLine (GetComplaints ().Content.ToString ());
    }

    public static IRestResponse GetComplaints ()
    {
        RestClient client = new RestClient ();
        client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
        client.Authenticator =
            new HttpBasicAuthenticator ("api",
                                        "YOUR_API_KEY");
        RestRequest request = new RestRequest ();
        request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
        request.Resource = "{domain}/complaints";
        return client.Execute (request);
    }

}

.. code-block:: go

 func GetComplaints(domain, apiKey string) (int, []mailgun.Complaint, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   return mg.GetComplaints()
 }
