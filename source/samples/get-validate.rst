
.. code-block:: bash

    curl -G --user 'api:pubkey-5ogiflzbnjrljiky49qxsiozqef5jxp7' -G \
	https://api.mailgun.net/v3/address/validate \
	--data-urlencode address='foo@mailgun.net'

.. code-block:: java

 public static ClientResponse GetValidate() {
 	Client client = new Client();
 	client.addFilter(new HTTPBasicAuthFilter("api",
 			"pubkey-5ogiflzbnjrljiky49qxsiozqef5jxp7"));
 	WebResource webResource =
 		client.resource("https://api.mailgun.net/v3" +
 				"/address/validate");
 	MultivaluedMapImpl queryParams = new MultivaluedMapImpl();
 	queryParams.add("address", "foo@mailgun.net");
 	return webResource.queryParams(queryParams).get(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('pubkey-5ogiflzbnjrljiky49qxsiozqef5jxp7');
  $validateAddress = 'foo@mailgun.net';

  # Issue the call to the client.
  $result = $mgClient->get("address/validate", array('address' => $validateAddress));
  # is_valid is 0 or 1
  $isValid = $result->http_response_body->is_valid;
.. code-block:: py

 def get_validate():
     return requests.get(
         "https://api.mailgun.net/v3/address/validate",
         auth=("api", "pubkey-5ogiflzbnjrljiky49qxsiozqef5jxp7"),
         params={"address": "foo@mailgun.net"})

.. code-block:: rb

 def get_validate
   url_params = Multimap.new
   url_params[:address] = "foo@mailgun.net"
   query_string = url_params.collect {|k, v| "#{k.to_s}=#{CGI::escape(v.to_s)}"}.
     join("&")
   RestClient.get "https://api:pubkey-5ogiflzbnjrljiky49qxsiozqef5jxp7"\
   "@api.mailgun.net/v3/address/validate?#{query_string}"
 end

.. code-block:: csharp

 public static IRestResponse GetValidate() {
 	RestClient client = new RestClient();
 	client.BaseUrl = new Uri("https://api.mailgun.net/v3");
 	client.Authenticator =
 		new HttpBasicAuthenticator("api",
 		                           "pubkey-5ogiflzbnjrljiky49qxsiozqef5jxp7");
 	RestRequest request = new RestRequest();
 	request.Resource = "/address/validate";
 	request.AddParameter("address", "foo@mailgun.net");
 	return client.Execute(request);
 }

.. code-block:: go

 func ValidateEmail(domain, publicApiKey string) (mailgun.EmailVerification, error) {
   mg := mailgun.NewMailgun(domain, "", publicApiKey)
   return mg.ValidateEmail("foo@mailgun.net")
 }
