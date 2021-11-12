=====================    =========    ======================================================================================================================
Name                     Type         Description
=====================    =========    ======================================================================================================================
kid                      string       Unique identifier for a seed list.
created_at               datetime     Date and time that seed list was created.
updated_at               datetime     Date and time that seed list was updated. Will update whenever it is changed.
last_result_at           datetime     Date and time that seed list was updated. Will update whenever a new result comes in.
target_email             string       The required email address that must be included in a mailing list for an inbox placement test to work.
sending_domains          array        The list of possible domains that the messages must come from.
has_results              bool         A flag that is true when results exist for this seed list
name                     string       The name of the seed list
seed_filter              string       A regular expression value that will be used to filter the list of seeds in the seed list.
mailing_list             string       A mailing list that contains the target email, and available seeds.
delivery_stats           object       An object that contains sub-objects that describe delivery stats. See below.
results                  array        An array of results from the seed list's tests.
=====================    =========    ======================================================================================================================
