# To-Do application

## Test it on Expo

The application can be accessed throught the _Expo_ App by scanning the QR code:

## Goals

The main goal of this application is to experience developing an app with local
persistance using _Expo_ _SQLite_. As a full-stack developer, I always had my
apps have a structured back-end. However, simple applications like this don't need
one, and can have the business and persistance layers in the mobile application
itself.

To access the database, instead of writing raw queries, which is all the _Expo_
API offers, _TypeORM_ will be used. The goal with it is trying to build a "reactive"
access using custom _hooks_.

## Application

For the application, there are a couple of guidelines I wish to follow. First off,
it will be the simplest form of a to-do list:

* Version 1 - Simple to-do list with just a text and a boolean status being stored;

* Version 2 - Being able to create different lists with their own names. From that,
the visual layer should be able to switch between the lists, and the persistance
layer will have a relationship between _ToDo_ and _List_ entities.

# What I've learned
These are some of the tools and concepts I was able to use while developing this
project.

## Local persistance layer

Having a separate **backend** is not always necessary. On the other hand, storing
everything in `json` format using `AsyncStorage` is also not always the best idea.

With that in mind, I wanted to build something that would be able to apply a simple
local persistance layer. The application is rather trivial and it's main purpose
is the development proccess itself and applying some of the ideas I had in mind.

First off, the database is provided by the `expo-sqlite` functionality available
in **Expo** out of the box. To access it, I've used **TypeORM**.

The ORM already provides a separate connection option just for this type of SQLite
database using Expo. However, there were a couple problems involving just TypeORM
alone:

1. I wasn't able to use the _default_ connection provided by the library. A
connection object had to be accessed by the components that would need to access
the data layer. To achieve that, a simple **React context** passes down to the
components the **repositories** created to access the data. The repositories themselves
recieve the connection object and use it to make all kinds of database access logic.

2. Even using the **repository** wrapper pattern and using the TypeORM repository
object to access the database showed a couple problems. Some of the operations had
to be done executing raw queries since I wasn't able to solve the problems easily
enough.

### Conclusions

There are no out of the box ORM / query builder tools that were built to be used
on React Native to access data layers like I needed. At least not ones with TS
support and/or being actively worked on.

TypeORM technically does have it but the problems I faced hinted that it's just
an adaptation of the Node API - which is the main purpose of the library, at the
end of the day.

## Reanimated animations

For this project I've also decided to explore more with the animations API, since
there were so many opportunities to have them on the interface.

The basic idea behind either `react-native` default animations API or
`react-native-reanimated` 1.x or 2.x alpha APIs is having a numeric value that
controls the progress of the animation and is handled by the library separately.
I had to use all three of these in this project for different animations implemented.

Most of the animations were done using animated styles passed to Animated components.
The values of the style props can be controlled by the animated values.

## Lottie animations

For the checkbox icon, I decided to have a Lottie animation. It's API is super
simple, it imports the animation as a `json` file and does all the work.

Following the Animations API from `react-native` it takes an `Animated.Value` to
control the progress of the animation declaratively as a parameter of the `Lottie`
component. Using that, the animation can be controlled forwards and backwards,
making it possible to "check" and "uncheck" a todo with the same animation really
smoothly.

```tsx
const [animationProgress] = useState(new Animated.Value(0));

const startAnimation = useCallback(() => {
  Animated.timing(animationProgress, {
    toValue: 1,
    duration: 400,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start();
}, []);

// ...

return (
  <Lottie
    source={importedJsonAnimationFile}
    progress={animationProgress}
  />
);
```

Unfortunately, the `Animated` import cannot be the same used in `react-native-reanimated`
library. `Animated` and `Easing` neccessarily have to be imported from `react-native`
in order for it to work.

<!-- ## Code abstraction in React projects -->
