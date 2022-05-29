
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -G \
      https://api.mailgun.net/v4/seedlists

.. code-block:: java

    import com.mailgun.api.v4.MailgunSeedListApi;
    import com.mailgun.client.MailgunClient;
    import com.mailgun.model.seedlist.SeedListsPageRequest;
    import com.mailgun.model.seedlist.SeedListsResponse;

    // ...

    public SeedListsResponse getSeedLists() {
        MailgunSeedListApi mailgunSeedListApi = MailgunClient.config(API_KEY)
                .createApi(MailgunSeedListApi.class);

        SeedListsPageRequest filter = SeedListsPageRequest.builder()
                .limit(2)
                .offset(1)
                .ascending(false)
                .build();

        return mailgunSeedListApi.getAllSeedLists(filter);
    }

.. code-block:: php

  # Currently, the PHP SDK does not support the Inbox Placement endpoint.
  # Consider using the following php curl function.
  function get_seed_lists() {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v4/inbox/seedlists');
    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: py

 def get_seed_lists():
     return requests.get(
         "https://api.mailgun.net/v4/inbox/seedlists",
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def get_seed_lists
   RestClient.get("https://api:YOUR_API_KEY"\
                  "@api.mailgun.net/v4/inbox/seedlists"\
                  {|response, request, result| response }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class InboxPlacementTests
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetSeedLists ().Content.ToString ());
     }

     public static IRestResponse GetSeedLists ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v4");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "/inbox/seedlists";
         return client.Execute (request);
     }

 }

