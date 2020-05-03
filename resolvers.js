const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createToken = (user, secret, expiresIn = "1hr") => {
  const { userName, email } = user;
  return jwt.sign({ userName, email }, secret, { expiresIn });
};

const resolvers = {
  Query: {
    getRecipes: async (_, __, { recipe }) => {
      const recipes = await recipe.find();
      return recipes;
    },
    getCurrentUser: async (_, __, { currentUser, user }) => {
      if (!currentUser) throw Error("error");
      console.log("ok");
      const findUser = await user
        .findOne({ email: currentUser.email })
        .populate({ path: "favorites", model: "Recipe" });
      return findUser;
    },
  },
  Mutation: {
    addRecipe: async (_, args, { recipe }) => {
      const newRecipe = await new recipe({ ...args }).save();
      return newRecipe;
    },
    signupUser: async (_, { email, password, userName }, { user }) => {
      const userIndex = await user.findOne({ email });
      if (userIndex) throw new Error("user already exists");
      const newUser = await new user({ email, password, userName }).save();
      return { token: createToken(newUser, process.env.SECRET, "1hr") };
    },
    signinUser: async (_, { email, password }, { user }) => {
      const isUser = await user.findOne({ email });
      if (!isUser) throw new Error("user not found");
      const isValidPassword = await bcrypt.compare(password, isUser.password);
      if (!isValidPassword) throw new Error("invalid password");
      return { token: createToken(isUser, process.env.SECRET, "1hr") };
    },
  },
};

module.exports = resolvers;
