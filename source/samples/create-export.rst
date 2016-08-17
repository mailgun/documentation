.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
    https://api.mailgun.net/v3/exports/domains
    -x POST

.. code-block:: java

 public static ClientResponse CreateExport() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api", "YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v3/exports/domains");
 	return webResource.post(ClientResponse.class);
 }

.. code-block:: php

    Exports are unsupported in the php client bindings

.. code-block:: py

 def create_export():
     return requests.post(
         "https://api.mailgun.net/v3/exports/domains",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def create_export
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/exports/domains"
 end

.. code-block:: csharp

 public static IRestResponse CreateExport() {
 	RestClient client = new RestClient();
 	client.BaseUrl = new Uri("https://api.mailgun.net/v3/exports");
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
 	RestRequest request = new RestRequest();
 	request.Resource = "domains";
 	request.Method = Method.POST;
 	return client.Execute(request);
 }

.. code-block:: go

    Exports are unsupported in the go client bindings
