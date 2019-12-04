# Tuesday

This project is a simplified clone of [Monday.com](https://monday.com/). It allows teams to collaborate on projects, where you can group tasks and track the status of each task.

Free free to test out our app at https://jeffreyquan.github.io/tuesday-client/#/.

The server repository is located at https://github.com/jeffreyquan/tuesday-server.

## Getting started

#### Using our site

1. Create an account at https://jeffreyquan.github.io/tuesday-client/#/
2. Create a new project.
3. Ask your team members to sign up.
4. Invite your team members using the emails they used to sign up.
5. Once they accept your invitation, you can collaborate!


#### To test locally
Feel free to fork the repository or download locally.

**In the client directory:**
1. Run `npm install`
2. Run `PORT=3333 npm run start`

This will run using our server which was deployed to Heroku.

## Motivation

We wanted to build a practical tool that can utilised by many people. We were inspired by Monday.com because of their diverse range of features and smooth functionality.

The aim of this project was to deliver an app that has the following core requirements:
* **Models** - have at least 3 models, associated correctly.
* **Views** - use partials to DRY (Don't Repeat Yourself) up views.
* **Handles invalid data** - forms should validate data and handle correct inputs.
* **Use Gems** - use a GEM that talks to an API to add functionality to the app.
* **User Login** - basic authentication and authorisation.
* **Heroku** - deploy to Heroku.

This was our third project at General Assembly's Software Engineering Immersive course at Sydney.

## Technologies

* React - front-end
* Ruby on Rails - back-end
* [Material UI](https://material-ui.com/) - a React framework for styling

## Packages (React)
* [axios](https://github.com/axios/axios) - used for requests to the Rails API
* [underscore](https://underscorejs.org/)
* [rc-datepicker](https://github.com/buildo/rc-datepicker) - enable elegant selection of due date for tasks

## Gems (Rails)
* [Bcrypt](https://github.com/codahale/bcrypt-ruby) - for user authentication
* [jwt](https://github.com/jwt/ruby-jwt) - used for logging in and creating sessions
* [rack-cors](https://github.com/cyu/rack-cors) - used to enable Cross-Origin Resource Sharing(CORS)

## Contributors

* [@JinSeal](https://github.com/JinSeal/)
* [@shaneenvitug](https://github.com/shaneenvitug)
* [@jeffreyquan](https://github.com/jeffreyquan)

## Key Features

* Create custom groups for tasks
* Add and delete tasks
* Select status, priority, due date and owner of each task
* Invite members to join the project
* Switch between various project dashboards

## Learnings

* User authentication
* React front-end working with a Rails API
* Styling with Material UI
* Using [React hooks](https://reactjs.org/docs/hooks-intro.html) - using state without writing classes

## Future Developments

* **Inbox** - allow users to send messages to each other
* **Chat** - allow a group chat feature for teams working on the same project
