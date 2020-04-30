# Fetching and Updating Data with Queries and Mutations
Welcome to part two of **Boost Your React Apps with Apollo**! 🚀

In this section, you're going to learn about fetching and updating data using queries and mutations. My goal for you by the end of this section is to feel comfortable replacing those usual CRUD (create, read, update, delete) operations you do with REST with GraphQL queries and mutations. We're going to start to see some of the magic of GraphQL here, but it should still be an easy transition for you.

For this section, I've provided a starting point in `./starting-point`. This is an improved and styled version of what we did in [part 1 of this series](https://thinkster.io/tutorials/boost-your-react-apps-with-apollo-first-steps). 

To save us a little time, I've provided an `AddHabit` component with basic functionality that we'll use in this tutorial. Otherwise, you'll just be following along with what I do. 

To install the dependencies for and run the starting point, run:

```bash
cd 02-fetching-and-updating/starting-point/habit-tracker/
npm install
npm start
```

As always, I still provide the finished code (in `./finished-code`) in case you miss something or need a reference point.

This tutorial uses the same server we used in part 1 (it's at `../server`). You should be able to just run:

```bash
cd server
npm start
```

...and be off to the races.

Let's get started!

## Exercises
There are two exercises in this section:

1. Finish the Add Habit feature by using `error` and `loading` to improve the UI and UX in the `AddHabit` component.
2. Add the Delete Habit feature from start to finish: build the mutation in GraphQL Playground, add it to the `Habit` component, and build your UI using the `useMutation` hook.

## Helpful Links
- [Apollo docs: Queries](https://www.apollographql.com/docs/react/v3.0-beta/data/queries/)
- [Apollo docs: Mutations](https://www.apollographql.com/docs/react/v3.0-beta/data/mutations/)