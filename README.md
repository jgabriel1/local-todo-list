# To-Do application

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
