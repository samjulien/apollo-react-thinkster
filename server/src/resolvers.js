const { GraphQLDateTime } = require("graphql-iso-date");
const db = require("./models");

const resolvers = {
  Date: GraphQLDateTime,
  Habit: {
    entries(parent, args, ctx, info) {
      return db.getEntriesByHabitId(parent.id);
    },
  },
  Query: {
    habits() {
      return db.getHabits();
    },
    getHabitById(_, { id }) {
      return db.getHabitById(id);
    },
    entries() {
      return db.getEntries();
    },
    getEntryById(_, { id }) {
      return db.getEntryById(id);
    },
    getEntriesByHabitId(_, { id }) {
      return db.getEntriesByHabitId(id);
    },
    totalPoints() {
      return db.getTotalPoints();
    },
  },
  Mutation: {
    createHabit(_, { input }) {
      return db.addHabit(input);
    },
    updateHabit(_, { input }) {
      return db.updateHabit(input);
    },
    deleteHabit(_, { id }) {
      return db.deleteHabit(id);
    },
    createEntry(_, { input }) {
      return db.addEntry(input);
    },
    updateEntry(_, { input }) {
      return db.updateEntry(input);
    },
    deleteEntry(_, { id }) {
      return db.deleteEntry(id);
    },
  },
};

module.exports = { resolvers };
