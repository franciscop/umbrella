# .addClass(name)

> **Add html class(es) to each of the matched elements.**



## Parameters

`name`: a string that represents the class(es) to be added. If more than one class has to be added, separate them by an space. Examples: `"classA"`, `"classA classB"`.



## Return

`u`: returns the same instance of Umbrella JS



## Examples

Add the class `main` to all the `<h2>` from the page:

    u("h2").addClass("main");

Add the class `toValidate` and `ajaxify` to all the `<form>` present in the page:

    u("form").addClass("toValidate ajaxify");



## Related

[.removeClass(name)](/docs/removeclass) deletes class(es) from the matched elements.

[.hasClass(name)](/docs/hasclass) finds if the matched elements contain the class(es)
