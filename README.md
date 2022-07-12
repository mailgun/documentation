Mailgun Documentation
=====================

This Github repository represents Mailgun's documentation site, located at http://documentation.mailgun.com. The site
is based on the [Sphinx](http://sphinx-doc.org/) documentation generator for Python.

To suggest changes to the documentation, please submit an [Issue](https://github.com/mailgun/documentation/issues/new)
or [Pull Request](https://github.com/mailgun/documentation/compare/).

reStructuredText
----------------

The documentation pages are built using the [reStructuredText](http://docutils.sourceforge.net/rst.html) standard.
Github supports RST, so modification via Github's editor is recommended.

Deployment
----------

Documentation is hosted via ReadTheDocs and changes are automatically deployed when code is merged into the master. To
monitor build statuses and debug failed builds, see [the builds page](https://readthedocs.org/projects/mg-documentation/builds/).

Support and Feedback
--------------------

If you find an issue, please submit the issue in Github directly.
[Documentation Issues](https://github.com/mailgun/documentation/issues)

As always, if you need additional assistance, drop us a note through your Control Panel at
[https://app.mailgun.com/app/support](https://app.mailgun.com/app/support).

Building Documentation Locally
------------------------------

Install [Sphinx](https://www.sphinx-doc.org/en/master/usage/installation.html) and then run
the command `sphinx-build source build`. The built html files can then be found in the 
`build` directory.
