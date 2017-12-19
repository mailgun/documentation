.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' -G \
    https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/stats/total \
    -d event='accepted' \
    -d event='delivered' \
    -d event='failed' \
    -d duration='1m'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode getStats() throws UnirestException {
 
         HttpResponse<JsonNode> request = Unirest.get("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/stats/total")
             .basicAuth("api", API_KEY)
             .queryString("event", "accepted")
             .queryString("event", "delivered")
             .queryString("event", "failed")
             .queryString("duration","1m")
             .asJson();
 
         return request.getBody();
     }
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
   url_params = {}
   url_params[:duration] = "1m"
   url_params[:event] = []
   url_params[:event] << "accepted"
   url_params[:event] << "delivered"
   url_params[:event] << "failed"
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

 func GetStats(domain, apiKey string) ([]Stat, error) {
   mg := mailgun.NewMailgun(domain, apiKey, "")
   _, stats, err := mg.GetStats(-1, -1, nil, "accepted", "delivered", "failed");
   return stats, err
 }

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.get(`/${DOMAIN}/stats/total`, {"event": 'accepted', "event": 'delivered', "event": 'failed', "duration": '1m'}, function (error, body) {
   console.log(body);
 });
