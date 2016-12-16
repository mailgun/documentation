
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' https://api.mailgun.net/v3/exports

.. code-block:: java

 public static ClientResponse GetExports() {
 	Client client = Client.create();
 	client.addFilter(new HTTPBasicAuthFilter("api", "YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v3/exports");
 	return webResource.get(ClientResponse.class);
 }

.. code-block:: php

    Exports are unsupported in the php client bindings

.. code-block:: py

 def get_exports():
     return requests.get(
         "https://api.mailgun.net/v3/exports",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_exports
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/exports"
   }
 end

.. code-block:: csharp

 public static IRestResponse GetExports() {
 	RestClient client = new RestClient();
 	client.BaseUrl = new Uri("https://api.mailgun.net/v3");
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
 	RestRequest request = new RestRequest();
 	request.Resource = "exports";
 	return client.Execute(request);
 }

.. code-block:: go

    Exports are unsupported in the go client bindings
