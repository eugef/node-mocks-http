# Contributing

Contributions are always welcome, no matter how large or small. Here are the guidelines we ask our contributors to follow:

 - [Code of Conduct](#coc)
 - [Issues and Bugs](#issue)
 - [Feature Requests](#feature)
 - [Submission Guidelines](#submit)
 - [Coding Rules](#rules)
 - [Running Test Suite](#tests)
 - [Contact Us](#contact)

## <a name="coc"></a> Code of Conduct
We want to keep our project open and inclusive. We ask that before you
contribute, you read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## <a name="issue"></a> Found an Issue?
We definitely want to hear from you!

If you find a bug in the source code or a mistake in the docs, you can help us by
submitting an issue to our [Repository][issues]. Make sure you search through our existing [open and closed issues][issues-archive] in order to avoid duplicate submissions.

Want to contribute with a fix? Even better! Just submit a [Pull Request][pulls].

**Please read the [Submission Guidelines](#submit) below**.

## <a name="feature"></a> Want a Feature?
Need a new feature no yet available on node-mocks-http? Submit a new feature to our [GitHub Repository][issues].  

Think you can help us out by implementing the feature yourself? Go for it! Just craft and submit your [Pull Request][pulls].

**Please read the [Submission Guidelines](#submit) below**.

## <a name="submit"></a> Submission Guidelines

### Submitting an Issue
Before you submit your issue search the [archive][archive], maybe your question was already answered. Let's avoid duplicates.

If you believe your issue is a bug, and you can't find a issue in the [archive][issues-archive], just open a new issue. 

**Help us help you!**

Provide the following information to help us identify and fix the issue in a timely manner:

* **Overview** - describe the issue the best way you can, and if possible include a stack trace
* **Use Case** - explain why you consider this a bug
* **Version(s)** - tell us what version of node-mocks-http you're currently using
* **Reproduce** - it would be awesome if you could provide a live example (using [Plunker][plunker] or
  [JSFiddle][jsfiddle]), or at least a step-by-step description on how to reproduce it
* **Suggestions** - if you have identified the lines of code or the commit responsible for the problem please include it as well

### Submitting a Pull Request
We are a *Pull Request-friendly* project!

Your pull requests are always welcome. We only ask that  you adhere to the following guidelines before you submit your pull request:

* Search [GitHub][pulls] for an open or closed Pull Request that may be similar to yours. Avoid duplicates!
* Fork our [repo][repo] and create a local clone, if you haven't done so already.

     ```shell
     git clone https://github.com/YOUR-NAME/node-mocks-http.git
     ```

* If you had previously cloned the [repo][repo], make sure you sync it with the upstream repository.

     ```shell
     git remote add upstream https://github.com/howardabrams/node-mocks-http.git
     git fetch upstream
     git checkout master
     git merge upstream/master
	 ```

* Create a new topic branch:

     ```shell
     git checkout -b my-awesome-fix master
     ```

* Now do your thing! Create your fix/patch, **including appropriate test cases**.
* Follow our [Coding Rules](#rules).
* Run our test suite, as described in [below](#tests),
  and ensure that all tests pass.
* Commit your changes using a descriptive commit message

     ```shell
     git commit -a
     ```

  Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

* Push your branch to GitHub:

    ```shell
    git push origin my-awesome-fix
    ```

* In GitHub, send a pull request to `node-mocks-http`.
* If we find any issues we may suggest that you:
  * Make the required updates.
  * Re-run the [test suite](#tests) to ensure tests are still passing.
  * Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

    ```shell
    git rebase master -i
    git push origin my-awesome-fix -f
    ```

That's it!

#### Post merged cleanup

After we merge your pull request, you can safely delete your branch and pull the changes from our main (upstream) repository:

* Delete the remote branch on GitHub either through the GitHub web interface or your local shell as follows:

    ```shell
    git push origin --delete my-awesome-fix
    ```

* Check out the master branch:

    ```shell
    git checkout master -f
    ```

* Delete the local branch:

    ```shell
    git branch -D my-awesome-fix
    ```

* Update your master with the latest upstream version:

    ```shell
    git pull --ff upstream master
    ```

## <a name="rules"></a> Coding Rules

For a detailed list our the conding conventions used in our project please read our [Coding Rules](CODING_RULES.md).

## <a name="tests"></a> Running Test Suite

Navigate to the project folder and run `npm install` to install the
project's dependencies.

Then simply run the tests.

```bash
npm test
```

## <a name="contact"></a> Contact Us
[![Gitter chat](https://badges.gitter.im/howardabrams/node-mocks-http.png)](https://gitter.im/howardabrams/node-mocks-http)

If you have any other questions or comments about **node-mocks-http** that do not fall under the category of [issues](#issue), [bugs](#issue), or [feature requests](#feature), feel free to join us on our [Gitter channel][gitter].


[repo]: https://github.com/howardabrams/node-mocks-http
[issues]: https://github.com/howardabrams/node-mocks-http/issues
[issues-archive]: https://github.com/howardabrams/node-mocks-http/issues?q=is%3Aissue
[pulls]: https://github.com/howardabrams/node-mocks-http/pulls
[pulls-archive]: https://github.com/howardabrams/node-mocks-http/pulls?q=is%3Apr
[gitter]: https://gitter.im/howardabrams/node-mocks-http
[jsfiddle]: http://jsfiddle.net/
[plunker]: http://plnkr.co/edit
