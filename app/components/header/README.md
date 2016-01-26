# Landing page View

## What does it do?

### Includes Components:
Locale-selector
Water-colouring
Ui-animations.

The locale can be changed from the landing page only.
Contains a 'Get started' button if user isn't logged into FB and a 'Connect to start' button if they are.
onClick of the 'get started' buttons starts the login process and checks within BaseView.js.

onSuccess of a login this.loginAttemptSuccess() starts to fetch the data needed for the app.
If the user has already created a movie getUserMovie() gets those details from the api.
this.getTaggableFriends() and this.getUserPhotos() are fired straight away to start processing all the photos and friends data for the next view.

The page background elements animate in using the Water-colouring component, which adds each image element to a canvas element. IE10 and android devices get a simpler animateIn version
which doesn't use canvas, it instead using timelineLite to just transition them in.

The page logo and button elements transition in using the UI-animation component.
