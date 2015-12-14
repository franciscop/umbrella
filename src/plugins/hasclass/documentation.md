## .hasClass(name)

**Find if any of the matched elements contains the class passed:**

    u("a").hasClass("button")

You can also check **multiple classes** with the **AND condition**:

    u("a").hasClass("button primary")

This would be similar to:

    u("a").hasClass("button") && u("a").hasClass("primary")


### Parameters

**`name`**: a string that represents the class(es) to be matched. To pass several classes they must be separated by an space.



### Return

**`boolean`**: returns true if all of the passed classes are found in any of the matched elements and false if they couldn't be found.



### Related

[.addClass(name)](/docs/addclass) adds html class(es) to each of the matched elements.

[.removeClass(name)](/docs/removeclass) deletes class(es) from the matched elements.



### Example

Toggle the color of a button depending on the status

```html
    <a class="example button">Click me</a>

    <script src="//umbrellajs.com/umbrella.min.js"></script>
    <script>
      u(".example").on('click', function() {
        if(u(this).hasClass("error")) {
          u(this).removeClass("error").html("Click me");
        } else {
          u(this).addClass("error").html("Confirm");
        }
      });
    </script>
```