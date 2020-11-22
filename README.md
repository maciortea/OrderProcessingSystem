# Order processing system
Simple real-time order processing system, built in [ASP.NET Core with SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr) and [React](https://reactjs.org/).

## Description
Project consists of 3 applications:
- ASP.NET Core web server, which exposes a SignalR hub endpoint for order processing
- Ordering application, built in React, which provides an UI to create orders and check their status
- Order processor application, built in React, which is bootstrapped when server starts and provides users to view orders and modify their status

## How to use
To run the server, open **OrderProcessor.sln** with Visual Studio, and once the solution has loaded, press **Start Debugging** button. This action will start the SignalR web server and will launch **OrderProcessorClientApp** React application. 
To run the ordering application, open a terminal window and set **ordering-client-app** as current path and run the following commands:

```
$ npm install
$ npm start
```

Go to your browser and find the tab with title **Ordering app**, create a few orders, navigate to tab with title **Order processor terminal** and modify the status of the orders.
You will observe in the **Ordering app** that the status of the orders is updated in real-time.
