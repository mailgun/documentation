.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' -G \
    https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/stats/total \
    -d event='accepted' \
    -d event='delivered' \
    -d event='failed' \
    -d duration='1m'

.. code-block:: java

 public static ClientResponse GetStats() {
    Client client = new Client();
    client.addFilter(new HTTPBasicAuthFilter("api", "YOUR_API_KEY"));
    WebResource webResource =
        client.resource("https://api.mailgun.net/v3/YOUR_DOMAIN_NAME" +
            "/stats/total");
    MultivaluedMapImpl queryParams = new MultivaluedMapImpl();
    queryParams.add("event", "accepted");
    queryParams.add("event", "delivered");
    queryParams.add("event", "failed");
    queryParams.add("duration", "1m");
    return webResource.queryParams(queryParams).get(ClientResponse.class);
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');
  $domain = 'YOUR_DOMAIN_NAME';

  # Issue the call to the client.
  $result = $mgClient->get("$domain/stats/total", array(
      'event' => array('accepted', 'delivered', 'failed'),
      'duration' => '1m'
  ));

.. code-block:: py

 def get_stats():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/stats/total",
         auth=("api", "YOUR_API_KEY"),
         params={"event": ["accepted", "delivered", "failed"],
                 "duration": "1m"})

.. code-block:: rb

 def get_stats
   url_params = Multimap.new
   url_params[:duration] = "1m"
   url_params[:event] = "accepted"
   url_params[:event] = "delivered"
   url_params[:event] = "failed"
   query_string = url_params.collect {|k, v| "#{k.to_s}=#{CGI::escape(v.to_s)}"}.
     join("&")
   RestClient.get "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/stats/total?#{query_string}"
 end

.. code-block:: csharp

using System;
using System.IO;
using RestSharp;
using RestSharp.Authenticators;

public class GetStatsChunk
{

    public static void Main (string[] args)
    {
        Console.WriteLine (GetStats ().Content.ToString ());
    }

    public static IRestResponse GetStats ()
    {
        RestClient client = new RestClient ();
        client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
        client.Authenticator =
            new HttpBasicAuthenticator ("api",
                                        "YOUR_API_KEY");
        RestRequest request = new RestRequest ();
        request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
        request.Resource = "{domain}/stats/total";
        request.AddParameter ("event", "accepted");
        request.AddParameter ("event", "delivered");
        request.AddParameter ("event", "failed");
        request.AddParameter ("duration", "1m");
        return client.Execute (request);
    }

}

.. code-block:: go

 // Not supported yet.
