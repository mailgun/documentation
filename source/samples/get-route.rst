
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' \
      https://api.mailgun.net/v3/routes/4f3bad2335335426750048c6

.. code-block:: java

    import com.mailgun.api.v3.MailgunRoutesApi;
    import com.mailgun.model.routes.SingleRouteResponse;

    // ...

    public SingleRouteResponse getSingleRoute() {
        MailgunRoutesApi mailgunRoutesApi = MailgunClient.config(API_KEY)
            .createApi(MailgunRoutesApi.class);

        return mailgunRoutesApi.getSingleRoute(YOUR_ROUTE_ID);
    }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $route_id = '5d9fde0fd8b861ec16cf2549'

  # Issue the call to the client.
  $result = $mgClient->routes()->show($route_id);

.. code-block:: py

 def get_route():
     return requests.get(
         "https://api.mailgun.net/v3/routes/4e97c1b2ba8a48567f007fb6",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_route
   RestClient.
     get("https://api:YOUR_API_KEY"\
         "@api.mailgun.net/v3/routes/"\
         "4e97c1b2ba8a48567f007fb6"){|response, request, result| response }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetRouteChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetRoute ().Content.ToString ());
     }

     public static IRestResponse GetRoute ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "routes/{id}";
         request.AddUrlSegment ("id", "4e97c1b2ba8a48567f007fb6");
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func GetRoute(domain, apiKey string) (mailgun.Route, error) {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.GetRoute(ctx, "route_id")
 }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const route = await client.routes.get('your_route_id');
      console.log('route', route);
    } catch (error) {
      console.error(error);
    }
  })();

