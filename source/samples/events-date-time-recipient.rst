.. code-block:: bash

  curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' -G \
        https://api.mailgun.net/v2/samples.mailgun.org/events \
        --data-urlencode begin='Fri, 3 May 2013 09:00:00 -0000' \
        --data-urlencode ascending=yes \
        --data-urlencode limit=25 \
        --data-urlencode pretty=yes \
        --data-urlencode recipient=joe@example.com

.. code-block:: java

 public static ClientResponse GetLogs() {
  Client client = new Client();
  client.addFilter(new HTTPBasicAuthFilter("api",
      "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"));
  WebResource webResource =
      client.resource("
          https://api.mailgun.net/v2/samples.mailgun.org/events");
  MultivaluedMapImpl queryParams = new MultivaluedMapImpl();
  queryParams.add("begin", 50);
  queryParams.add("ascending", "yes");
  queryParams.add("limit", 1);
  queryParams.add("pretty", "yes");
  queryParams.add("f:recipient", "joe@example.com");
  return webResource.queryParams(queryParams).get(ClientResponse.class);
 }

.. code-block:: php


  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('key-3ax6xnjp29jd6fds4gc373sgvjxteol0');
  $domain = 'samples.mailgun.org';
  $queryString = array('begin'        => 'Fri, 3 May 2013 09:00:00 -0000',
                       'ascending'    => 'yes',
                       'limit'        =>  25,
                       'pretty'       => 'yes',
                       'subject'      => 'test');

  # Make the call to the client.
  $result = $mgClient->get("$domain/events", $queryString);

.. code-block:: py

 def get_logs():
     return requests.get(
         "https://api.mailgun.net/v2/samples.mailgun.org/events",
         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"),
         params={"begin"       : "Fri, 3 May 2013 09:00:00 -0000",
                 "ascending"   : "yes",
                 "limit"       :  25,
                 "pretty"      : "yes",
                 "f:recipient" : "joe@example.com"})

.. code-block:: rb

 def get_logs
   RestClient.get "https://api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0"\
   "@api.mailgun.net/v2/samples.mailgun.org/events", 
    :params => {
     :'begin'       => 'Fri, 3 May 2013 09:00:00 -0000',
     :'ascending'   => 'yes',
     :'limit'       =>  25,
     :'pretty'      => 'yes',
     :'f:recipient' => 'joe@example.com'
    }
 end

.. code-block:: csharp

  public static IRestResponse GetLogs() {
    RestClient client = new RestClient();
    client.BaseUrl = "https://api.mailgun.net/v2";
    client.Authenticator =
        new HttpBasicAuthenticator("api",
            "key-3ax6xnjp29jd6fds4gc373sgvjxteol0");
    RestRequest request = new RestRequest();
    request.AddParameter("domain",
        "samples.mailgun.org", ParameterType.UrlSegment);
    request.Resource = "{domain}/events";
    request.AddParameter("begin", "Fri, 3 May 2013 09:00:00 -0000");
    request.AddParameter("ascending", "yes");
    request.AddParameter("limit", 25);
    request.AddParameter("pretty", "yes");
    request.AddParameter("f:recipient", "joe@example.com");
    return client.Execute(request);
  }
