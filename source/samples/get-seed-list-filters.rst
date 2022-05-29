
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -G \
      https://api.mailgun.net/v4/inbox/seedlists/_filters

.. code-block:: java

    import com.mailgun.api.v4.MailgunSeedListApi;
    import com.mailgun.client.MailgunClient;
    import com.mailgun.model.seedlist.SeedListsFiltersResponse;

    // ...

    public SeedListsFiltersResponse getSeedListFilters() {
        MailgunSeedListApi mailgunSeedListApi = MailgunClient.config(API_KEY)
                .createApi(MailgunSeedListApi.class);

        return mailgunSeedListApi.getSeedListFilters();
    }

.. code-block:: php

  # Currently, the PHP SDK does not support the inbox placement endpoint.
  # Consider using the following php curl function.
  function get_seed_list_filters() {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v4/inbox/seedlists/_filters');
    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: py

 def get_seed_list_filters():
     return requests.get(
         "https://api.mailgun.net/v4/inbox/seedlists/_filters",
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def get_seed_list_filters
   RestClient.get("https://api:YOUR_API_KEY"\
                  "@api.mailgun.net/v4/inbox/seedlists/_filters"\
                  {|response, request, result| response }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class InboxPlacementTest
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetSeedListFilters().Content.ToString());
     }

     public static IRestResponse GetSeedListFilters()
     {
         RestClient client = new RestClient();
         client.BaseUrl = new Uri("https://api.mailgun.net/v4");
         client.Authenticator =
             new HttpBasicAuthenticator("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest();
         request.Resource = "/inbox/seedlists/_filters";
         return client.Execute(request);
     }

 }
