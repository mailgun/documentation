
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -G \
     https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/complaints/baz@example.com

.. code-block:: java

    import com.mailgun.api.v3.suppression.MailgunSuppressionComplaintsApi;
    import com.mailgun.model.suppression.complaints.ComplaintsItem;

    // ...

    public ComplaintsItem getComplaint() {
        MailgunSuppressionComplaintsApi suppressionComplaintsApi = MailgunClient.config(API_KEY)
            .createApi(MailgunSuppressionComplaintsApi.class);

        return suppressionComplaintsApi.getSingleComplaint(YOUR_DOMAIN_NAME, "baz@example.com");
    }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient  = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $domain    = 'YOUR_DOMAIN_NAME';
  $recipient = 'bob@example.com';

  # Issue the call to the client.
  $result = $mgClient->suppressions()->complaints()->show($domain, $recipient);

.. code-block:: py

 def get_complaint():
     return requests.get(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/complaints/baz@example.com",
         auth=("api", "YOUR_API_KEY"))

.. code-block:: rb

 def get_complaint
   RestClient.get("https://api:YOUR_API_KEY"\
                  "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/complaints/"\
                  "baz@example.com"){|response, request, result| response }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetComplaintChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetComplaint ().Content.ToString ());
     }

     public static IRestResponse GetComplaint ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.Resource = "{domain}/complaints/baz@example.com";
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func GetComplaints(domain, apiKey string) (mailgun.Complaint, error) {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.GetComplaint(ctx, "baz@example.com")
 }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  import formData from 'form-data';
  import Mailgun from 'mailgun.js';

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const complaintsForAddress = await client.suppressions.get(DOMAIN, 'complaints', 'baz@example.com');
      console.log('complaintsForAddress', complaintsForAddress);
    } catch (error) {
      console.error(error);
    }
  })();
