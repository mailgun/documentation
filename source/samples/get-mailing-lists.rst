
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -G \
      https://api.mailgun.net/v3/lists/pages

.. code-block:: java

    import com.mailgun.api.v3.MailgunMailingListApi;
    import com.mailgun.model.mailing.lists.MailingListDataResponse;

    // ...

    public MailingListDataResponse mailingLists() {
        MailgunMailingListApi mailgunMailingListApi = MailgunClient.config(API_KEY)
            .createApi(MailgunMailingListApi.class);

        return mailgunMailingListApi.getMailingList();
    }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');

  # Issue the call to the client.
  $response = $mgClient->mailingList()->pages();

.. code-block:: py

 def list_members():
     return requests.get(
         "https://api.mailgun.net/v3/lists/pages",
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def list_members
   RestClient.get("https://api:YOUR_API_KEY" \
                  "@api.mailgun.net/v3/lists/pages")
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetMailingListsChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetMailingLists ().Content.ToString ());
     }

     public static IRestResponse GetMailingLists ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "lists/pages";
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func ListMailingLists(domain, apiKey string) ([]mailgun.MailingList, error) {
     mg := mailgun.NewMailgun(domain, apiKey)
     it := mg.ListMailingLists(nil)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     var page, result []mailgun.MailingList
     for it.Next(ctx, &page) {
         result = append(result, page...)
     }

     if it.Err() != nil {
         return nil, it.Err()
     }
     return result, nil
 }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  import formData from 'form-data';
  import Mailgun from 'mailgun.js';

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const listsArray = await client.lists.list();
      console.log('lists', listsArray);
    } catch (error) {
      console.error(error);
    }
  })();
