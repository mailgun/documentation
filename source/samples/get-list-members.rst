
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -G \
      https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members/pages

.. code-block:: java

    import com.mailgun.api.v3.MailgunMailingListApi;
    import com.mailgun.model.mailing.lists.MailingListMembersResponse;

    // ...

    public MailingListMembersResponse listMembers() {
        MailgunMailingListApi mailgunMailingListApi = MailgunClient.config(API_KEY)
            .createApi(MailgunMailingListApi.class);

        return mailgunMailingListApi.getMailingListMembers(MAILING_LIST_ADDRESS);
    }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient     = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $mailing_list = 'LIST@YOUR_DOMAIN_NAME';

  # Issue the call to the client.
  $result =  $mgClient->mailingList()->member()->index($mailing_list);

.. code-block:: py

 def list_members():
     return requests.get(
         "https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members/pages",
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def list_members
   RestClient.get("https://api:YOUR_API_KEY" \
                  "@api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members/pages")
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetListMembersChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetListMembers ().Content.ToString ());
     }

     public static IRestResponse GetListMembers ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "lists/{list}/members/pages";
         request.AddParameter ("list", "LIST@YOUR_DOMAIN_NAME",
                               ParameterType.UrlSegment);
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func GetMembers(domain, apiKey string) ([]mailgun.Member, error) {
     mg := mailgun.NewMailgun(domain, apiKey)
     it := mg.ListMembers("list@example.com", nil)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     var page, result []mailgun.Member
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
      const listingMembers = await client.lists.members.listMembers(DOMAIN);
      console.log('listingMembers', listingMembers);
    } catch (error) {
      console.error(error);
    }
  })();

