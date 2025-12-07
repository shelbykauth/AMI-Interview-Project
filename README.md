# Software Developer Applicant Assessment - AMI

The goal is to create a Single Page weather application.

# How to install (WIP)

Overview:

Prerequisites:

- The sdks for .NET 8 or 10 should be installed on server machine (see below)
- Node.js should be installed on server machine (see below), or use alternate submission (vanilla-frontend)
- Download & Extract the zip file, or `git clone ...` into a new file location

Backend:

- Start in backend directory
- Run `dotnet build`
- Run `dotnet run`
- (Instructions WIP, raw dotnet, or maybe IIS)

Frontend:

- Start in frontend directory
- Run `npm run build`
- Serve files from frontend/dist/
- (Instructions WIP, raw node, IIS, nginx, etc)

# Specs

- Frontend
  - Code must run directly after extraction.
  - Layout
    - Form and two buttons - "Add" and "Refresh" (maybe make form minimizable, with top bar labeling the form)
    - flex grid of cards for each city's weather data (maybe skeleton loader, and a 'last updated at' timestamp above, and maybe a way to remove cards)
    - line-chart below
  - Mobile Friendly (just in case)
  - Configurable backend endpoint location
- Backend
  - C# .NET Web Server
  - REST API endpoint mirroring weather by location
  - No CORS blocking (test this on separate device with hostname)
- Deliverables
  - Single zip file, uploaded to web (I'm going to use git release.)
    - Zip should contain the source code
  - Documentation on how to run

# Questions

- Framework allowed, but can't use Node on the client machine, and no minified/built, no installed dependencies. This seems to disagree with most modern frameworks. Options include:
  - a. forget the framework, just do vanilla JS/HTML/CSS
  - b. include built files and source code
  - c. both. Show how I would do it in each method.
  - d. I'm misunderstanding, and this is permitted to be built and installed on the server machine. Don't include built files, but do expect Node.js on build server

# To Do

- [ ] Create folders for project structure
- [ ] Hello World for frontend and backend
- [ ] Make sure it can run as directed
  - [ ] I'm working on a macbook, so it should run there.
  - [ ] Most people will use Windows, so I should test it on my Personal Computer.
- [ ]

# Idealized Features that may be over-engineered for this assessment

- [ ] Use OpenStreetMap to warn on invalid city/state/zips and/or suggest valid city/state/zips
- [ ] Mobile Friendly interface (might be easy to include by default)
- [ ] Cache external API requests (but maybe not because we don't have a datastore to use)
