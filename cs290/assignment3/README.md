[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=9088059&assignment_repo_type=AssignmentRepo)
# Assignment 3

**Assignment and Code Blog Entry due at 11:59pm on Monday 11/7/2022**<br/>
**Demo due by 11:59pm on Monday 11/21/2022**

The goal of this assignment is to start using JavaScript on the client-side to add interactions to a web page, including reacting to user-generated events and manipulating the DOM.  We will build off of our work from Assignment 2.

Here, you are provided with an `index.html` file and a `style.css` file that, combined, give you the "Benny's List" page we worked on in Assignment 2 (plus a little extra that we'll use in this assignment).  You're also given an empty `index.js` file.  Your job is to fill out `index.js` to add interactions to the page, as described below.

## 1. Support inserting new posts

First, you'll add functionality to the Benny's List page to allow the user to create new posts on the client.  This should work as follows:

1. Clicking the orange "sell something" button should display a modal that allows the user to enter information to create a new post on Benny's List.  The modal (along with a backdrop that goes behind it to shade the underlying page while the modal is displayed) are both already included in the HTML code, [starting at line 199 of `index.html`](index.html#L199-L264), but they are hidden.  Clicking the orange "sell something" button should un-hide them.  You'll have to examine the HTML to figure out the relevant IDs/classes to use to accomplish this.

2. When the modal is open, clicking the modal close button (the small "X" in the upper-right corner) or the modal cancel button (the one in the modal footer that says "Cancel") should close the modal by re-hiding it along with the modal backdrop.  When the modal is closed, the values of all of the input fields within the modal should be cleared so they don't appear the next time the it's opened.

3. When the modal is open, clicking the modal accept button (the one in the modal footer that says "Create Post") should close the modal (clearing any user-input values in the process) and generate a new post that is placed inside the posts container *after* all of the other existing posts.  The new post should match the structure of the existing posts so it is styled correctly and can be filtered.  Here is what the structure of the new post should look like:

    ```html
    <div class="post" data-price="{{price}}" data-city="{{city}}" data-condition="{{condition}}">
      <div class="post-contents">
        <div class="post-image-container">
          <img src="{{photoURL}}" alt="{{itemDescription}}">
        </div>
        <div class="post-info-container">
          <a href="#" class="post-title">{{itemDescription}}</a> <span class="post-price">${{price}}</span> <span class="post-city">({{city}})</span>
        </div>
      </div>
    </div>
    ```

    Here, the info in curly brackets (`{{}}`) should be obtained from the corresponding input fields from the modal.

    **Importantly, you should not use `innerHTML` to generate DOM content directly from user-input content, since this opens up a vulnerability to cross-site scripting attacks.  You must ensure that user-input content is safely added into the DOM.**

    When the new post is created and the modal is closed, the values of all of the input fields should be cleared so they don't appear the next time the modal is opened.

4. If the user clicks the modal accept button while any of the input fields is blank, the user should be alerted (using the [`alert()` function](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert)), and the modal should be kept open until the user either closes/cancels it or provides values for all input fields.  A new post should not be created if the user hasn't specified values for all fields.

## 2. Support filtering posts

Next, you'll add functionality to the Benny's List page that allows the user to enter values into one or more of the filter inputs in the page's sidebar and to apply those filter values to show only a subset of the posts on the page.  Specifically, when the user clicks the "Update" button that accompanies the filters in the sidebar, it should result in the posts being filtered so that only ones that meet the specified filtering criteria (i.e. the filter values entered by the user) are displayed, while posts that don't meet the filtering criteria are removed from the DOM (not just hidden).

The filters should have the following behaviors:

  * If the user enters text in the "text" filter, only posts that contain that text as a substring (case-insensitive) should be displayed.

  * If the user enters a price in the minimum price filter, only posts whose price is greater than or equal to the specified price should be displayed.

  * If the user enters a price in the maximum price filter, only posts whose price is less than or equal to the specified price should be displayed.  The user should be able to enter both a minimum price and a maximum price to display only posts that fall within the specified price range.

  * If the user selects a city in the filters, only posts with a matching city (case-insensitive) should be displayed.

  * If the user selects any of the "condition" options in the filters, only posts that match the selected conditions should be displayed.

  * The user should be able to specify any combination of multiple filters (e.g. text, maximum price, and city).  If they do, only posts that match *all* of the specified filters should be displayed.

  * The filters should be applied to *all* posts, including both the original eight posts as well as any new posts created by the user using the functionality described above.

  * The user should be able to "re-filter" the posts.  In other words, if the user changes the filter values and hits the filter "Update" button, the filters should be re-applied to all of the posts, including all of the original ones and all newly-added ones.  This means that posts that were removed from the DOM because of the previous filter values might need to be re-added back into the DOM.  If the user clears all of the filter values and clicks the "Update" button, all of the original posts and any newly-added ones should be displayed again.  In all cases, the posts should always remain in the same order relative to each other.

### `data` attributes

Note that to make it easier for you to filter on price, city, and condition, each post in the HTML includes some `data` attributes, e.g.:
```
<div class="post" data-price="20" data-city="Corvallis" data-condition="excellent">...</div>
```
This is a common practice for storing extra data associated with particular elements in a web page.  It will make things easier for you if you use the values of these data attributes for filtering posts instead of trying to parse those values out from other locations in the HTML.  [This MDN page](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes) describes how `data` attributes work and how you can easily access their values from the client-side JS.

## Extra credit: adding new cities

Right now, the user is free to enter any city name when creating a post, but there is a fixed set of city names in the "city" filter's dropdown menu.  For extra credit, update the page's behavior so that if the user enters a city in a new post that doesn't already exist in the "city" filter's dropdown menu, that city is added dynamically to the dropdown menu.  After a city is added to the filter dropdown, the user should be able to select it and have the filter behave as described above to display only posts from the new city.  Each new city should be added to the dropdown only once.  In other words, there shouldn't be duplicate cities in the dropdown.

## Code blog

Add an entry to your Code Blog reflecting on your experience with this assignment and publish the new entry.  Here are some questions you could answer (though these aren't the only ones):

* What was challenging about the assignment, and what specific kinds of problems did you have.  How did you solve those problems?

* What did you learn from the assignment?  Were there any special insights you had?  What did you find that you already knew?

* What kinds of resources were helpful for completing the assignment?  Specific websites?  Lectures?  The class Campuswire forum?  The TAs?  How did you use each of these resources?

* What are one or two things you had to Google to complete the assignment?

## Submission

As always, we'll be using GitHub Classroom for this assignment, and you will submit your assignment via GitHub.  Just make sure your completed files are committed and pushed by the assignment's deadline to the main/main branch of the GitHub repo that was created for you by GitHub Classroom.  A good way to check whether your files are safely submitted is to look at the main branch your assignment repo on the github.com website (i.e. https://github.com/osu-cs290-f22/assignment-3-YourGitHubUsername/). If your changes show up there, you can consider your files submitted.

In addition to submitting your assignment via GitHub, you must submit the URL to your code blog entry (e.g. http://web.engr.oregonstate.edu/~YOUR_ONID_ID/cs290/blog.html) via Canvas by the due date specified above.  Make sure to submit your code blog URL on Canvas even if it hasn't changed from the one you submitted for previous assignments.

## Grading criteria

This assignment will be graded based only your `index.js` file, and any changes you make to `index.html` or `style.css` will be disregarded.

The assignment is worth 100 points total:

* New post creation: 65 points

  * 10 points: clicking the orange "sell something" button displays the modal and its backdrop as described above

  * 10 points: clicking either the modal's close button or the modal's cancel button hides the modal and backdrop as described above

  * 30 points: clicking the modal's accept button adds a new post to the end of the page as described above if the user has specified values for all required input fields

  * 5 points: when creating a new post, the page is not vulnerable to a cross-site scripting attack via user-supplied values

  * 5 points: clicking the modal's accept button when a value is not specified by the user for any input field results in the user being alerted and the modal remaining open, as described above

  * 5 points: whenever the modal is closed (either when a post is created or not), any input values the user specified are cleared so they do not appear when the modal is opened the next time

* Post filtering: 35 points

  * 5 points: client-side JS correctly reads filter values entered by the user

  * 20 points: user-supplied filtering criteria are correctly applied to filter the posts when the user clicks the "Update" button (i.e. the correct posts are displayed for the specified filtering criteria when the button is clicked), with filtered posts completely removed from the DOM (not just hidden)

  * 10 points: re-filtering is enabled as described above, i.e. when the user changes the filter values and clicks the "Update" button, all matching posts are displayed, even ones that were removed from the DOM based on previous filtering

* Extra credit:
  * Up to 10 points for dynamically adding new cities to the dropdown list in the filters as described above

In addition to your programming assignment grade, you will receive a pass/fail grade for your code blog entry, included in the code blog portion of your grade.
