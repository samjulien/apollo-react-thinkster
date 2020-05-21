# Beyond the Basics
Welcome to part three of **Boost Your React Apps with Apollo**! 🚀

In this section, you'll go beyond the basics with Apollo to get some really cool stuff done! You're going to learn some more advanced GraphQL and Apollo concepts here. We'll cover updating UIs after a mutation completes, how to get started with Apollo's amazing caching mechanics, polling the server, and much more.

For this section, I've provided a starting point in `./starting-point`. This is a more complete version of what we did in [part 2 of this series](https://thinkster.io/tutorials/boost-your-react-apps-with-apollo-fetching-updating-data). 

To install the dependencies for and run the starting point, run:

```bash
cd 02-beyond-the-basics/starting-point/habit-tracker/
npm install
npm start
```

As always, I still provide the finished code (in `./finished-code`) in case you miss something or need a reference point.

This tutorial uses the same server we used in parts 1 and 2 (it's at `../server`). You should be able to just run:

```bash
cd server
npm start
```

...and be ready to go.

As always, you can [reach out to me on Twitter](https://twitter.com/samjulien) if you need something and check out [my main website](http://www.samjulien.com/) to keep up to date with the JavaScript ecosystem.

Let's get started!

## Exercises

1. Use the `onCompleted` method in the `AddEntry.js` component to hide the form once the mutation is completed. 
2. Refactor deleting a habit so that it removes the item from the cache instead of refetching the entire habit list.
3. Create a fragment for the fields on the `Entry` data type. Use the fragment in `AddEntry.js` and `Habit.js`.

## Helpful Links

- [Apollo docs: useMutation API](hhttps://www.apollographql.com/docs/react/v3.0-beta/data/mutations/#usemutation-api)
- [Apollo docs: Configuring the Cache](https://www.apollographql.com/docs/react/v3.0-beta/caching/cache-configuration/)
- [Apollo docs: Updating the Cache after a Mutation](https://www.apollographql.com/docs/react/v3.0-beta/data/mutations/#updating-the-cache-after-a-mutation)
- [Apollo docs: Interacting with the Cache](https://www.apollographql.com/docs/react/v3.0-beta/caching/cache-interaction/)
- [Apollo docs: useLazyQuery](https://www.apollographql.com/docs/react/v3.0-beta/api/react/hooks/#uselazyquery)
- [Apollo docs: Fragments](https://www.apollographql.com/docs/react/v3.0-beta/data/fragments/)