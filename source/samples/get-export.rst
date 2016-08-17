.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v3/exports/EXPORT_ID

.. code-block:: java

 public static ClientResponse GetExport() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"YOUR_API_KEY"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v3/exports/EXPORT_ID);
 	return webResource.get(ClientResponse.class);
 }

.. code-block:: php

    Exports are unsupported in the php client bindings

.. code-block:: py

 def get_export():
     return requests.get(
         "https://api.mailgun.net/v3/exports/EXPORT_ID",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_export
   RestClient.get("https://api:YOUR_API_KEY"\
                  "@api.mailgun.net/v3/exports/EXPORT_ID"\
                  {|response, request, result| response }
 end

.. code-block:: csharp

 public static IRestResponse GetExport() {
 	RestClient client = new RestClient();
 	client.BaseUrl = new Uri("https://api.mailgun.net/v3");
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "YOUR_API_KEY");
 	RestRequest request = new RestRequest();
 	request.AddParameter("id",
                            "EXPORT_ID", ParameterType.UrlSegment);
       request.Resource = "/exports/{id}";
 	return client.Execute(request);
 }

.. code-block:: go

    Exports are unsupported in the go client bindings
