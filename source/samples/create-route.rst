.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' \
     https://api.mailgun.net/v3/routes \
     -F priority=0 \
     -F description='Sample route' \
     -F expression='match_recipient(".*@YOUR_DOMAIN_NAME")' \
     -F action='forward("http://myhost.com/messages/")' \
     -F action='stop()'

.. code-block:: java

    import com.mailgun.api.v3.MailgunRoutesApi;
    import com.mailgun.model.routes.RoutesRequest;
    import com.mailgun.model.routes.RoutesResponse;

    // ...

    public RoutesResponse createRoute() {
        MailgunRoutesApi mailgunRoutesApi = MailgunClient.config(API_KEY)
            .createApi(MailgunRoutesApi.class);

        RoutesRequest routesRequest = RoutesRequest.builder()
            .priority(0)
            .description("sample route")
            .expression("match_recipient('.*@YOUR_DOMAIN_NAME')")
            .action("forward('http://myhost.com/messages/')")
            .action("stop()")
            .build();

        return mailgunRoutesApi.createRoute(routesRequest);
    }


.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');

  # Define your expression, actions, and description
  $expression   = 'match_recipient(".*@mg.example.com")';
  $actions      = array('forward("my_address@example.com")', 'stop()');
  $description  = 'Catch All and Forward';

  # Issue the call to the client.
  $result = $mgClient->routes()->create($expression, $actions, $description);

.. code-block:: py

 def create_route():
     return requests.post(
         "https://api.mailgun.net/v3/routes",
         auth=("api", "YOUR_API_KEY"),
         data={"priority": 0,
               "description": "Sample route",
               "expression": "match_recipient('.*@YOUR_DOMAIN_NAME')",
               "action": ["forward('http://myhost.com/messages/')", "stop()"]})

.. code-block:: rb

 def create_route
   data = {}
   data[:priority] = 0
   data[:description] = "Sample route"
   data[:expression] = "match_recipient('.*@YOUR_DOMAIN_NAME')"
   data[:action] = []
   data[:action] << "forward('http://myhost.com/messages/')"
   data[:action] << "stop()"
   RestClient.post "https://api:YOUR_API_KEY"\
   "@api.mailgun.net/v3/routes", data
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class CreateRouteChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (CreateRoute ().Content.ToString ());
     }

     public static IRestResponse CreateRoute ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "routes";
         request.AddParameter ("priority", 0);
         request.AddParameter ("description", "Sample route");
         request.AddParameter ("expression", "match_recipient('.*@YOUR_DOMAIN_NAME')");
         request.AddParameter ("action",
                               "forward('http://myhost.com/messages/')");
         request.AddParameter ("action", "stop()");
         request.Method = Method.POST;
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func CreateRoute(domain, apiKey string) (mailgun.Route, error) {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.CreateRoute(ctx, mailgun.Route{
         Priority:    1,
         Description: "Sample Route",
         Expression:  "match_recipient(\".*@YOUR_DOMAIN_NAME\")",
         Actions: []string{
             "forward(\"http://example.com/messages/\")",
             "stop()",
         },
     })
 }

.. code-block:: js

  import formData from 'form-data';
  import Mailgun from 'mailgun.js';

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const createdRoute = await client.routes.create({
        expression: 'match_recipient(".*@YOUR_DOMAIN_NAME")',
        action: ['forward("http://myhost.com/messages/")', 'stop()'],
        description: 'Sample route'
      });
      console.log('createdRoute', createdRoute);
    } catch (error) {
      console.error(error);
    }
  })();


